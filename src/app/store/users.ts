// store/modalStore.ts
import { create } from "zustand";

interface MyUser {
    userName: string;
    setUserName: (newUserName:string) => void;
    //   closeModal: () => void;
}

const useMyUser = create<MyUser>((set) => ({
    userName: "",
    setUserName: (newUserName) => set({ userName: newUserName }),
}));

export default useMyUser;