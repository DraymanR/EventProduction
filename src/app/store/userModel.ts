
import { create } from 'zustand';
import { User, Address, Post, SupplierDetails, UserFormData } from "@/app/types/user"; // נעדכן בהתאם למיקום ה-Types שלך

interface UserStore {
    user: UserFormData | null,
    likedPostsArr: Post[],
    likedPeople: string[],
    postArr: Post[],
    setUser: (newUser: UserFormData) => void;
    setLikedPostsArr: (newPost: Post | Post[]) => void;
    setLikedPeople: (newPeople: string | string[]) => void;
    setPostArr: (newPost: Post | Post[]) => void;
    isReady: boolean;
    setReady: (ready: boolean) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    likedPostsArr: [],
    likedPeople: [],
    postArr: [],
    setUser: (newUser: UserFormData) => {
        console.log("Setting user:", newUser);
        set({ user: newUser })
    },
    setLikedPostsArr: (newPosts: Post | Post[]) =>
        set((state) => ({
            likedPostsArr: Array.isArray(newPosts) ? [...state.likedPostsArr, ...newPosts] : [...state.postArr, newPosts],
        })),
    setLikedPeople: (newPeople: string | string[]) =>
        set((state) => ({
            likedPeople: Array.isArray(newPeople) ? [...state.likedPeople, ...newPeople] : [...state.likedPeople, newPeople],
        })),
    setPostArr: (newPosts: Post | Post[]) =>
        set((state) => ({
            postArr: Array.isArray(newPosts) ? [...state.postArr, ...newPosts] : [...state.postArr, newPosts],
        })),
    isReady: false,
    setReady: (ready: boolean) => set({ isReady: ready }),
    clearUser: () => set({ user: null, likedPostsArr: [], likedPeople: [], postArr: [] }),
}));

export default useUserStore;