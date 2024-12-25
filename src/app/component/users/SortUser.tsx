import { getAllUsers } from "@/app/services/user/getDetails";
import React, { useState } from "react";

interface SortFilterProps {
    onFilterChange: (filters: { language?: string; title?: string; city?: string }) => void;
    setFilteredUsers: (users: any[]) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
    const [filters, setFilters] = useState({ language: "", title: "", city: "" });

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);  // עדכון הסטייט
        const data = await getAllUsers(1, 10, updatedFilters);

        console.log("uu", data.users);
        if (data.users.length > 0) {
            
        }  // שלח את הסטייט המעודכן
        setFilteredUsers(data.users);
        onFilterChange(updatedFilters); // Update filters in the parent
    };


    return (
        <div className="filter-container">
            <label>
                שפה:
                <select name="language" value={filters.language} onChange={handleInputChange}>
                    <option value="">בחר שפה</option>
                    <option value="English">אנגלית</option>
                    <option value="Hebrew">עברית</option>
                    <option value="Spanish">ספרדית</option>
                </select>
            </label>
            <label>
                טייטל:
                <input
                    type="text"
                    name="title"
                    placeholder="הכנס טייטל"
                    value={filters.title}
                    onChange={handleInputChange}
                />
            </label>
            <label>
                עיר:
                <input
                    type="text"
                    name="city"
                    placeholder="הכנס עיר"
                    value={filters.city}
                    onChange={handleInputChange}
                />
            </label>
        </div>
    );
};
export default SortFilter