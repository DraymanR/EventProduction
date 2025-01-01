import { useState, useEffect } from "react";

interface Message {
  userId: string;
  user: string;
  bot: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]); // הודעות בשיחה
  const [input, setInput] = useState(""); // הודעה נוכחית של המשתמש
  const [userId, setUserId] = useState<string>(""); // מזהה המשתמש
  
  // קריאת usernameId מה-cookies
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const userCookie = cookies.find((row) => row.startsWith("usernameId="));
    if (userCookie) {
      setUserId(userCookie.split("=")[1]);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !userId) {
      alert("User ID or message is missing.");
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input, userId }), // שליחת הודעה עם מזהה המשתמש
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { userId, user: input, bot: data.response },
      ]);
      setInput(""); // איפוס שדה הקלט
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          height: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <p>
              <strong>{msg.userId}:</strong> {msg.user}
            </p>
            <p>
              <strong>Bot:</strong> {msg.bot}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{
          width: "80%",
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: "10px 15px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}
