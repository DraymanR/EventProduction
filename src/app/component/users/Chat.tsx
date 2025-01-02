"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAllUsers } from "@/app/services/user/getDetails";
import Types from "ably";
import { Realtime } from "ably";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import useUserStore from "@/app/store/userModel";
import { getBaseUrl } from "@/app/services/config/axios";

// Initialize Ably client
const ably = new Realtime({
  key: "1jLHPA.p9RW9g:MVb0GFzKUviMVC1i5vyIGPqIX4XyGj1Dg_762-7Mw4c",
});

const Chat = () => {
  const [messages, setMessages] = useState<{ _id: string; username: string; text: string }[]>([]);
  const [message, setMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [otherUser, setOtherUser] = useState<string>(""); // Store the other user's username
  const [userList, setUserList] = useState<string[]>([]); // Store the list of users
  const [isSending, setIsSending] = useState(false);

  const username = useUserStore((st) => st.user?.userName) || "xxx";
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audio = new Audio("/assets/adio/newmessage.wav");
  const baseUrl = getBaseUrl();

  useEffect(() => {
    // Fetch all users to display in the user list
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data.users);
        const supplierOptions = data.users.map((user: any) => user.userName);
        console.log(supplierOptions);

        setUserList(supplierOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!otherUser) return;

    const channelName = getChannelName(username, otherUser);
    const channel = ably.channels.get(channelName);

    // Subscribe to messages on the channel
    channel.subscribe("newMessage", (msg: Types.Message) => {
      setMessages((prev) => [...prev, msg.data]);
      if (msg.data.username !== username) {
        audio
          .play()
          .then(() => console.log("Sound played successfully"))
          .catch((error) => {
            console.error("Failed to play sound:", error);
          });
      }
    });

    // Fetch initial messages from the server
    const fetchMessages = async () => {
      try {
        console.log("71");
        console.log("otherUserotherUser",otherUser);
        
        const response = await axios.get(`${baseUrl}/api/chat/${otherUser}`);
        // const response = await axios.get(`${baseUrl}/api/chat/otheruser?otheruser=${otherUser}`);
        console.log(response.data);
        
        setMessages(response.data.messages);

      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    return () => {
      channel.unsubscribe();
    };
  }, [username, otherUser]);

  const getChannelName = (user1: string, user2: string) => {
    const sortedUsers = [user1, user2].sort();
    return sortedUsers.join("_"); // Channel name based on sorted usernames
  };

  const handleSendMessage = async () => {
    if (isSending || !message.trim()) return;
    setIsSending(true);
    try {
      console.log("otherUser", otherUser);
      console.log("username", username);

      const channelName = getChannelName(username, otherUser);
      console.log("channelName", channelName);

      // Send message to the server
      await axios.post(`${baseUrl}/api/chat`, {
        username,
        text: message,
        otheruser: otherUser,
        // channelName,
      });

      // Publish message to Ably
      const channel = ably.channels.get(channelName);
      channel.publish("newMessage", { username, text: message });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false); // Release the lock after sending
    }
  };

  // const handleDeleteMessage = async (messageId: string) => {
  //     try {
  //         await deleteMessage(messageId);
  //         setMessages((prev) => prev.filter((msg) => msg._id !== messageId)); // Update state
  //     } catch (error) {
  //         console.error("Error deleting message:", error);
  //     }
  // };

  const handleEditMessage = async () => {
    if (!editingMessageId) {
      console.log("no message id");
      return;
    }
    try {
      await axios.put(`${baseUrl}/api/chat`, {
        messageId: editingMessageId,
        newText: editingText,
      });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === editingMessageId ? { ...msg, text: editingText } : msg
        )
      );
      setEditingMessageId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingMessageId(id);
    setEditingText(text);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editingText !== "") {
        handleEditMessage();
      } else {
        handleSendMessage();
      }
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSelectUser = (selectedUser: string) => {
    setOtherUser(selectedUser);
    setMessages([]); // Clear previous messages when switching users
  };

  return (
    <div className="flex flex-col h-[600px] w-[1000px] mx-auto bg-gray-50 shadow-md rounded-lg">
      {/* User selection */}
      <div className="bg-blue-200 text-blue-900 py-3 px-4 flex items-center justify-between shadow-sm rounded-t-lg">
        <h2 className="text-lg font-medium">Select User to Chat</h2>
        <select
          value={otherUser}
          onChange={(e) => handleSelectUser(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">Select a user</option>
          {userList.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Header */}
      {otherUser && (
        <div className="bg-blue-200 text-blue-900 py-3 px-4 flex items-center justify-between shadow-sm rounded-t-lg">
          <h2 className="text-lg font-medium">Chat with {otherUser}</h2>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-white p-4 space-y-3">
        {messages.map((msg , index) => (
          <div
            key={index}
            className={`group flex items-center gap-2 ${msg.username === username ? "justify-end" : "justify-start"
              }`}
          >
            <div
              key={index}
              className={`relative max-w-[75%] px-4 py-2 rounded-lg shadow-sm ${msg.username === username
                ? "bg-blue-100 text-blue-900"
                : "bg-gray-200 text-gray-800"
                }`}
            >
              {editingMessageId === msg._id ? (
                <div key={index}>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full border rounded p-1"
                    onKeyDown={handleKeyDown}
                  />
                  <div className="flex justify-end gap-2 mt-1">
                    <button
                      onClick={handleEditMessage}
                      className="text-blue-500"
                    >
                      Save
                    </button>
                    <button onClick={cancelEditing} className="text-red-500">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{msg.text}</p>
                  <div className="absolute top-0 right-0 hidden group-hover:flex gap-1 m-4 ml-36">
                    {msg.username === username && (
                      <div className="flex gap-2 mr-6">
                        <button
                          onClick={() => startEditing(msg._id, msg.text)}
                          className="text-blue-500"
                        >
                          <MdModeEdit />
                        </button>
                        {/* <button
                                                    // onClick={() => handleDeleteMessage(msg._id)}
                                                    className="text-red-500"
                                                >
                                                    <MdDelete />
                                                </button> */}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-100 p-3 flex items-center gap-2 rounded-b-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-400 disabled:opacity-50"
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;
