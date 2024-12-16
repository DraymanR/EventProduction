"use client";
import React, { useState, useEffect } from "react";
import { EventCategory } from "@/app/types/user"; // ייבוא ה-Enum של סוגי האירועים

interface SearchBarProps {
  onSearch: (userName: string, eventTitle: string, eventType: EventCategory) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [userName, setUserName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<EventCategory | "">("");

  const handleSearch = () => {
    onSearch(userName, eventTitle, eventType as EventCategory);
  };

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="חפש לפי שם משתמש"
      />
      <input
        type="text"
        value={eventTitle}
        onChange={(e) => setEventTitle(e.target.value)}
        placeholder="חפש לפי שם אירוע"
      />
      <select value={eventType} onChange={(e) => setEventType(e.target.value as EventCategory)}>
        <option value="">בחר סוג אירוע</option>
        {Object.values(EventCategory).map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button onClick={handleSearch}>חפש</button>
    </div>
  );
};

export default SearchBar;
