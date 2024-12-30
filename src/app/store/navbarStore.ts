import { create } from 'zustand';

interface NavbarState {
  isOpen: boolean; // מצב האם ה-navbar פתוח
  toggleNavbar: (open:boolean) => void; // פעולה להחלפת המצב (פתיחה/סגירה)
}

const useNavbarStore = create<NavbarState>((set) => ({
  isOpen: false, // מצב התחלתי: סגור
  toggleNavbar: (open:boolean) => set((state) => ({ isOpen: open })), // פעולה להחלפת מצב
}));

export default useNavbarStore;
