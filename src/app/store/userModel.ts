import { create } from 'zustand';
import { Post, UserFormData } from "@/app/types/user"; // נעדכן בהתאם למיקום ה-Types שלך

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
        set((state) => {
            const postsToAdd = Array.isArray(newPosts) ? newPosts : [newPosts];
            const updatedPosts = [...state.likedPostsArr, ...postsToAdd].filter(
                (post, index, arr) => arr.findIndex((p) => p._id === post._id) === index
            );
            return { likedPostsArr: updatedPosts };
        }),
    setPostArr: (newPosts: Post | Post[]) =>
        set((state) => {
            const postsToAdd = Array.isArray(newPosts) ? newPosts : [newPosts];
            const updatedPosts = [...state.postArr, ...postsToAdd].filter(
                (post, index, arr) => arr.findIndex((p) => p._id === post._id) === index
            );
            return { postArr: updatedPosts };
        }),

    setLikedPeople: (newPeople: string | string[]) =>
        set((state) => ({
            likedPeople: Array.isArray(newPeople) ? [...state.likedPeople, ...newPeople] : [...state.likedPeople, newPeople],
        })),
    isReady: false,
    setReady: (ready: boolean) => set({ isReady: ready }),
    clearUser: () => set({ user: null, likedPostsArr: [], likedPeople: [], postArr: [] , isReady: false,}),
}));

export default useUserStore;
