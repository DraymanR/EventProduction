import { getAllUsers } from "@/app/services/user/getDetails";
import { Language, Title } from "@/app/types/user";
import React, { useState } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";

interface SortFilterProps {
    onFilterChange: (filters: { language?: string[]; title?: string[]; city?: string }) => void;
    setFilteredUsers: (users: any[]) => void;
}

interface Option {
    value: string;
    label: string;
}

const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
    const [filters, setFilters] = useState<{ language: string[]; title: string[]; city: string }>({
        language: [],
        title: [],
        city: "",
    });

    const languageOptions: Option[] = [
        { value: Language.English, label: "אנגלית" },
        { value: Language.French, label: "צרפתית" },
        { value: Language.Hebrew, label: "עברית" },
        { value: Language.Russian, label: "רוסית" },
        { value: Language.Spanish, label: "ספרדית" },
        { value: Language.Yiddish, label: "אידיש" },
    ];

    const titleOptions: Option[] = Object.values(Title).map((title) => ({
        value: title,
        label: title,
    }));

    const handleLanguageChange = (
        selectedOptions: MultiValue<Option | undefined>,
        actionMeta: ActionMeta<Option | undefined>
    ) => {
        const selectedLanguages = selectedOptions
            .filter((option): option is Option => option !== undefined) // סינון undefined
            .map((option) => option.value);
        const updatedFilters = { ...filters, language: selectedLanguages };
        updateFilters(updatedFilters);
    };

    const handleTitleChange = (
        selectedOptions: MultiValue<Option | undefined>,
        actionMeta: ActionMeta<Option | undefined>
    ) => {
        const selectedTitles = selectedOptions
            .filter((option): option is Option => option !== undefined) // סינון undefined
            .map((option) => option.value);
        const updatedFilters = { ...filters, title: selectedTitles };
        updateFilters(updatedFilters);
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const updatedFilters = { ...filters, city: value };
        updateFilters(updatedFilters);
    };

    const updateFilters = async (updatedFilters: typeof filters) => {
        setFilters(updatedFilters);
        const data = await getAllUsers(1, 10, updatedFilters); // Get filtered users
        setFilteredUsers(data.users);
        onFilterChange(updatedFilters); // Notify parent of filter change
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
};

export default SortFilter;
