import { create } from 'zustand';

interface NavbarState {
  isOpen: boolean; // מצב האם ה-navbar פתוח
  toggleNavbar: () => void; // פעולה להחלפת המצב (פתיחה/סגירה)
}

const useNavbarStore = create<NavbarState>((set) => ({
  isOpen: false, // מצב התחלתי: סגור
  toggleNavbar: () => set((state) => ({ isOpen: !state.isOpen })), // פעולה להחלפת מצב
}));

export default useNavbarStore;
