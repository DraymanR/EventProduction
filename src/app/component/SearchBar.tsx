"use client";
import React, { useState } from "react";
import { EventCategory } from "@/app/types/user";

interface SearchBarProps {
  onSearch: (
    userName: string,
    eventTitle: string,
    eventType: EventCategory,
    startDate: string,
    endDate: string,
    description: string
  ) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [userName, setUserName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<EventCategory | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSearch = () => {
    onSearch(userName, eventTitle, eventType as EventCategory, startDate, endDate, description);
  };

  return (
    <div className="space-y-4">
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
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="תאריך התחלה"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="תאריך סיום"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="חפש לפי תיאור"
      />
      <button onClick={handleSearch}>חפש</button>
    </div>
  );
};

export default SearchBar;
