// store/modalStore.ts
import { create } from "zustand";
import { Post, User, UserFormData } from "@/app/types/user";

interface UserModal {
    user: UserFormData,
    likedPostsArr: Post[],
    likedPeople: string[],
    postArr: Post[],
    setUser: (newUser: UserFormData) => void;
    setLikedPostsArr: (newPost: Post) => void;
    setLikedPeople: (newPeople: string) => void;
    setPostArr: (newPost: Post) => void;
}

const useUserModal = create<UserModal>((set) => ({
    user:
    {
        porofilPic: '',
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        titles: [],
        phone: '',
        description: '',
        languages: [],
        address: {
            zipCode: '',
            city: '',
            street: '',
            building: 0,
        },
        supplierDetails: {
            startingPrice: 0,
            topPrice: 0,
            eventList: [],
            recommendation: [],
            range: 0,
            emptyDate: [],
            images: [],
            description: '',
        },
    },
    likedPostsArr: [],
    likedPeople: [],
    postArr: [],
    setUser: (newUser: UserFormData) => set({ user: newUser }),
    setLikedPostsArr: (newPost: Post) => set((state) => ({ likedPostsArr: [...state.likedPostsArr, newPost] })),
    setLikedPeople: (newPeople: string) => set((state) => ({ likedPeople: [...state.likedPeople, newPeople] })),
    setPostArr: (newPost: Post) => set((state) => ({ postArr: [...state.postArr, newPost] })),
}));

export default useUserModal;