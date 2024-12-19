'use client'
import PostList from '@/app/component/posts/PostList';
import { getMyDetails } from '@/app/services/user/getDetails';
import { updateUserStore, useUpdateUserStore } from '@/app/services/user/registerUser';
import useUserStore from '@/app/store/userModel';
import { UserFormData } from '@/app/types/user';
import { useEffect } from 'react';
const Home = () => {
    const uuser = useUserStore((state) => state.user);
    useEffect(() => {
        const getMyPersonalDetails = async () => {
            if (useUserStore.getState().isReady) return; // הימנע משאילתת נתונים כפולה
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
        };
        getMyPersonalDetails();
    }, []);

    console.log("!!!!", uuser);

    return (
        <div>
            <PostList />
        </div>

    )
}
export default Home;
