// // // store/modalStore.ts
// // import { create } from "zustand";
// // import { Post, User, UserFormData } from "@/app/types/user";

// // interface UserModal {
// //     user: UserFormData | null,
// //     likedPostsArr: Post[],
// //     likedPeople: string[],
// //     postArr: Post[],
// //     setUser: (newUser: UserFormData) => void;
// //     setLikedPostsArr: (newPost: Post) => void;
// //     setLikedPeople: (newPeople: string) => void;
// //     setPostArr: (newPost: Post) => void;
// // }

// // const useUserModal = create<UserModal>((set) => ({
// //     user: null,
// //     likedPostsArr: [],
// //     likedPeople: [],
// //     postArr: [],
// //     setUser: (newUser: UserFormData) => set({ user: newUser }),
// //     setLikedPostsArr: (newPost: Post) => set((state) => ({ likedPostsArr: [...state.likedPostsArr, newPost] })),
// //     setLikedPeople: (newPeople: string) => set((state) => ({ likedPeople: [...state.likedPeople, newPeople] })),
// //     setPostArr: (newPost: Post) => set((state) => ({ postArr: [...state.postArr, newPost] })),
// // }));

// // export default useUserModal;

// addressId:{_id: '675940c9f611536f06c01ed6', userName: 'גדיי', zipCode: '9514205', city: 'ירושלים', street: 'ילין דוד', …}
// description:"גדי המושלם!!!!!"
// email:"12993@gmail.com"
// firstName: "גד"
// languages:(2) ['Hebrew', 'French']
// lastName:"לוי"
// likedPeople:[]
// likedPostsArr:[]
// phone:"0546987412"
// postArr:[]
// profileImage:null
// titles:[]
// userName:"גדיי"

// interface UserStore {
//   user: User | null;
//   address: Address | null;
//   posts: Post[];
//   supplierDetails: SupplierDetails | null;
//   setUser: (user: User) => void;
//   setAddress: (address: Address) => void;
//   setPosts: (posts: Post[]) => void;
//   setSupplierDetails: (details: SupplierDetails) => void;
//   clearUser: () => void;
// }

// const useUserStore = create<UserStore>((set) => ({
//   user: null,
//   address: null,
//   posts: [],
//   supplierDetails: null,
//   setUser: (user) => set({ user }),
//   setAddress: (address) => set({ address }),
//   setPosts: (posts) => set({ posts }),
//   setSupplierDetails: (details) => set({ supplierDetails: details }),
//   clearUser: () => set({ user: null, address: null, posts: [], supplierDetails: null }),
// }));

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
