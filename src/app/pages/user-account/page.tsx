'use client'
import PostList from '@/app/component/posts/PostList';
import UserList from '@/app/component/users/UserList';
import { getMyDetails } from '@/app/services/user/getDetails';
import { useUpdateUserStore } from '@/app/services/user/registerUser';
import useNavbarStore from '@/app/store/navbarStore';
import useUserStore from '@/app/store/userModel';
import { UserFormData } from '@/app/types/user';
import { useEffect, useState } from 'react';
const Home = () => {
    const updateUserStore = useUpdateUserStore(); // קריאה ל-Hook מחוץ לפונקציה הפנימית
    const [isReady, setIsReady] = useState(false);
    const storpostArr = useUserStore((state) => state.postArr);
    const storlikedPeople = useUserStore((state) => state.likedPeople);
    const storlikedPostsArr = useUserStore((state) => state.likedPostsArr);
    const storeUser = useUserStore((state) => state.user);
    const toggleNavbar = useNavbarStore((state) => state.toggleNavbar);
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        const getMyPersonalDetails = async () => {
            toggleNavbar(true)
            if (useUserStore.getState().isReady) return; // הימנע משאילתת נתונים כפולה
            if(storeUser)return;
            try {
                const userDetails = await getMyDetails();
                const user: UserFormData = {
                    firstName: userDetails.user.firstName,
                    lastName: userDetails.user.lastName,
                    userName: userDetails.user.userName,
                    email: userDetails.user.email,
                    password: '',
                    titles: userDetails.user.titles,
                    phone: userDetails.user.phone,
                    languages: userDetails.user.languages,
                    address: { ...userDetails.user.addressId },
                    description: userDetails.user.description,
                    profileImage: userDetails.user.profileImage,
                };
                updateUserStore(
                    user,
                    userDetails.user.likedPostsArr,
                    userDetails.user.likedPeople,
                    userDetails.user.postArr
                );
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        }
        getMyPersonalDetails()
    }, [])

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-4">
                        <button
                            className={`py-2 px-4 ${activeTab === "users"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("users")}
                        >
                            משתמשים
                        </button>
                        <button
                            className={`py-2 px-4 ${activeTab === "posts"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setActiveTab("posts")}
                        >
                            פוסטים
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    {activeTab === "users" && <UserList />}
                    {activeTab === "posts" && <PostList />}
                </div>

            </div>
        </div>

    )
}
export default Home;