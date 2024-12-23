"use client";
import React, { useState } from "react";
import {  SearchBarProps, Title } from "@/app/types/user";
import { EventCategory } from "@/app/types/post";


const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [userName, setUserName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<EventCategory | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [userTitle, setUserTitle] = useState<Title | "">("");

  const handleSearch = () => {
    onSearch(
      userName,
      eventTitle,
      eventType as EventCategory,
      startDate,
      endDate,
      description,
      userTitle as Title
    );
  };

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="חפש לפי שם משתמש"
        className="input-field"
      />
      <input
        type="text"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        placeholder="חפש לפי שם אירוע"
        className="input-field"
      />
      <select
        value={eventType}
        onChange={(e) => setEventType(e.target.value as EventCategory)}
        className="input-field"
      >
        <option value="">בחר סוג אירוע</option>
        {Object.values(EventCategory).map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="input-field"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="חפש לפי תיאור"
        className="input-field"
      />
      <select
        value={userTitle}
        onChange={(e) => setUserTitle(e.target.value as Title)}
        className="input-field"
      >
        <option value="">בחר סוג לקוח</option>
        {Object.values(Title).map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        חפש
      </button>
    </div>
  );
};

export default SearchBar;
