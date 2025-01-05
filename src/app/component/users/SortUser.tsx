// 'use client'
// import { Language, Option, Title } from "@/app/types/user";
// import React, { useState } from "react";
// import Select, { MultiValue } from "react-select";



// export interface SortFilterProps {
//     onFilterChange: (filters: { language?: string[]; title?: string[]; city?: string[] }) => void;
//     setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>; // הוספה נכונה של setFilteredUsers
// }

// const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
//     const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
//     const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);


//     const languageOptions: Option[] = Object.values(Language).map((value) => ({
//         value: value as string,
//         label: value as string,
//     }));

//     const titleOptions: Option[] = Object.values(Title).map((value) => ({
//         value: value as string,
//         label: value as string,
//     }));

//     const handleLanguageChange = (selectedOptions: MultiValue<Option>) => {
//         setSelectedLanguages(selectedOptions);
//         const languages = selectedOptions.map((option) => option.value);
//         onFilterChange({ language: languages, title: undefined, city: undefined });
//     };

//     const handleTitleChange = (selectedOptions: MultiValue<Option>) => {
//         setSelectedTitles(selectedOptions);
//         const titles = selectedOptions.map((option) => option.value);
//         onFilterChange({ language: undefined, title: titles, city: undefined });
//     };

  
//     return (
//         <div className="filter-container">
//             <label>
//                 שפה:
//                 <Select
//                     options={languageOptions}
//                     isMulti
//                     placeholder="בחר שפות..."
//                     value={selectedLanguages}
//                     onChange={handleLanguageChange}
//                 />
//             </label>
//             <label>
//                 תפקיד:
//                 <Select
//                     options={titleOptions}
//                     isMulti
//                     placeholder="בחר תפקידים..."
//                     value={selectedTitles}
//                     onChange={handleTitleChange}
//                 />
//             </label>
//         </div>
//     );
// };

// export default SortFilter;

'use client';
import { Language, Option, Title } from "@/app/types/user";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

export interface SortFilterProps {
    onFilterChange: (filters: { language?: string[]; title?: string[]; city?: string[]; userName?: string }) => void;
    setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
    const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
    const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);
    const [userName, setUserName] = useState<string>("");

    const languageOptions: Option[] = Object.values(Language).map((value) => ({
        value: value as string,
        label: value as string,
    }));

    const titleOptions: Option[] = Object.values(Title).map((value) => ({
        value: value as string,
        label: value as string,
    }));

    const handleLanguageChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedLanguages(selectedOptions);
        const languages = selectedOptions.map((option) => option.value);
        onFilterChange({ language: languages, title: undefined, city: undefined, userName });
    };

    const handleTitleChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedTitles(selectedOptions);
        const titles = selectedOptions.map((option) => option.value);
        onFilterChange({ language: undefined, title: titles, city: undefined, userName });
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserName(value);
        onFilterChange({ userName: value, language: undefined, title: undefined, city: undefined });
    };

    return (
        <div className="filter-container">
            <label>
                שם משתמש:
                <input
                    type="text"
                    placeholder="חפש לפי שם משתמש..."
                    value={userName}
                    onChange={handleUserNameChange}
                    className="search-input"
                />
            </label>
            <label>
                שפה:
                <Select
                    options={languageOptions}
                    isMulti
                    placeholder="בחר שפות..."
                    value={selectedLanguages}
                    onChange={handleLanguageChange}
                />
            </label>
            <label>
                תפקיד:
                <Select
                    options={titleOptions}
                    isMulti
                    placeholder="בחר תפקידים..."
                    value={selectedTitles}
                    onChange={handleTitleChange}
                />
            </label>
        </div>
    );
};

export default SortFilter;
