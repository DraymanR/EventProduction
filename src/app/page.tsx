"use client";
import { useState } from "react";
import PostList from "@/app/component/posts/PostList";
import UserList from "@/app/component/users/UserList";

const Home = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="container mx-auto p-4">
      <div className="border-b border-gray-200">
        <div className="flex space-x-4">
          <button
            className={`py-2 px-4 ${
              activeTab === "users"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`py-2 px-4 ${
              activeTab === "posts"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "users" && <UserList />}
        {activeTab === "posts" && <PostList />}
      </div>
      
    </div>
  );
};

export default Home;