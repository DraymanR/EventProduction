import { getAllUsers } from "@/app/services/user/getDetails";
import { Language, Title } from "@/app/types/user";
import React, { useState } from "react";
import { SortFilterProps } from '@/app/types/post'


interface Option {
    value: string;
    label: string;
}

const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
    const [filters, setFilters] = useState<{ language: string[]; title: string[]; city: string[] }>({
        language: [],
        title: [],
        city: [],
    });

    const languageOptions: Option[] = [
        { value: Language.English, label: "אנגלית" },
        { value: Language.French, label: "צרפתית" },
        { value: Language.Hebrew, label: "עברית" },
        { value: Language.Russian, label: "רוסית" },
        { value: Language.Spanish, label: "ספרדית" },
        { value: Language.Yiddish, label: "אידיש" },
    ];

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
                <Select
                    options={languageOptions}
                    isMulti
                    placeholder="בחר שפות..."
                    onChange={handleLanguageChange}
                    value={filters.language.map((lang) => languageOptions.find((opt) => opt.value === lang))}
                />
            </label>
            <label>
                טייטל:
                <Select
                    options={titleOptions}
                    isMulti
                    placeholder="בחר טייטלים..."
                    onChange={handleTitleChange}
                    value={filters.title.map((title) => titleOptions.find((opt) => opt.value === title))}
                />
            </label>
            <label>
                עיר:
                <input
                    type="text"
                    name="city"
                    placeholder="הכנס עיר"
                    value={filters.city}
                    onChange={handleCityChange}
                />
            </label>
        </div>
    );
}
export default SortFilter;
