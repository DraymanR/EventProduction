// import { getAllUsers } from "@/app/services/user/getDetails";
// import { Language, Title } from "@/app/types/user";
// import React, { useState } from "react";
// import { SortFilterProps } from '@/app/types/post'
// import Select, { MultiValue } from "react-select";


// interface Option {
//     value: string;
//     label: string;
// }
// export interface SortFilterProps {
//     onFilterChange: (filters: { language?: [string]; title?: [string]; city?: [string] }) => void;
//     setFilteredUsers: (users: any[]) => void;
// }
// const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
//     const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
//     const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);
//     const [filters, setFilters] = useState<{ language?: string[]; title?: string[]; city: string[] }>({
//         language: [],
//         title: [],
//         city: [],
//     });
//     const language: Option[] = [
//         { value: Language.English, label: "אנגלית" },
//         { value: Language.French, label: "צרפתית" },
//         { value: Language.Hebrew, label: "עיברית" },
//         { value: Language.Russian, label: "רוסית" },
//         { value: Language.Spanish, label: "ספרדית" },
//         { value: Language.Yiddish, label: "אידייש" },

//     ];

//     const titleOptions: Option[] = Object.keys(Title).map(key => ({
//         value: Title[key as keyof typeof Title],
//         label: Title[key as keyof typeof Title],
//     }));
//     titleOptions.push({
//         value: 'consumer',
//         label: 'צרכן',
//     });
//     const mySetSelectedTitles = (selectedOptions: MultiValue<Option>) => {
//         setSelectedTitles(selectedOptions);
//         const titleArray = selectedOptions.map(option => option.value as Title);

//     };

//     const mySetSelectedLanguages = (selectedOptions: MultiValue<Option>) => {
//         setSelectedLanguages(selectedOptions);
//         // עדכון formData.languages עם ערכים כמחרוזות
//         const languagesArray = selectedOptions.map((option) => option.value as Language);
//         console.log(languagesArray);
//     }

   


//     console.log("uu", data.users);
//     if (data.users.length > 0) {

//     }  // שלח את הסטייט המעודכן
//     setFilteredUsers(data.users);
//     onFilterChange(updatedFilters); // Update filters in the parent


//     return (
//         <div className="filter-container">
//             <label>
//                 שפה:
//                 <Select
//                     options={language}
//                     isMulti
//                     placeholder="בחר שפות..."
//                     onChange={mySetSelectedLanguages}

//                     value={selectedLanguages}
//                 />

//             </label>
//             <label>
//                 טייטל:
//                 <Select
//                     options={titleOptions}
//                     isMulti
//                     placeholder="בחר טיטל"
//                     onChange={mySetSelectedTitles}
//                     value={selectedTitles}
//                 />
//             </label>
//             <label>
//                 עיר:
//                 <input
//                     type="text"
//                     name="city"
//                     placeholder="הכנס עיר"
//                     value={filters.city}
//                     onChange={handleCityChange}
//                 />
//             </label>
//         </div>
//     );
// }
// export default SortFilter;

// SortFilter.tsx
import { Language, Option, Title } from "@/app/types/user";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

// interface Option {
//     value: string;
//     label: string;
// }

export interface SortFilterProps {
    onFilterChange: (filters: { language?: string[]; title?: string[]; city?: string[] }) => void;
    setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>; // הוספה נכונה של setFilteredUsers
}

const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
    const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
    const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);

    // const languageOptions: Option[] = [
    //     { value: "English", label: "אנגלית" },
    //     { value: "French", label: "צרפתית" },
    //     { value: "Hebrew", label: "עברית" },
    //     { value: "Russian", label: "רוסית" },
    //     { value: "Spanish", label: "ספרדית" },
    //     { value: "Yiddish", label: "אידיש" },
    // ];
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
        onFilterChange({ language: languages, title: undefined, city: undefined });
    };

    const handleTitleChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedTitles(selectedOptions);
        const titles = selectedOptions.map((option) => option.value);
        onFilterChange({ language: undefined, title: titles, city: undefined });
    };

  
    return (
        <div className="filter-container">
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
