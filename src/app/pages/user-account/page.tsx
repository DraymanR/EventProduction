'use client'
import NewPhoto from '@/app/component/posts/ImageUploader'
import PostList from '@/app/component/posts/PostList';
import { getMyDetails } from '@/app/services/user/getDetails';
import { useUpdateUserStore } from '@/app/services/user/registerUser';
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

    useEffect(() => {
        const getMyPersonalDetails = async () => {
            console.log("user!",storeUser);
            try {
                const userDetailes = await getMyDetails()
                console.log("userDetailes::", userDetailes);
                const user: UserFormData = {
                    firstName: userDetailes.user.firstName,
                    lastName: userDetailes.user.lastName,
                    userName: userDetailes.user.userName,
                    email: userDetailes.user.email,
                    password: '',
                    titles: userDetailes.user.titles,
                    phone: userDetailes.user.phone,
                    languages: userDetailes.user.languages,
                    address: { ...userDetailes.user.addressId },
                    description: userDetailes.user.description,
                    profileImage: userDetailes.user.profileImage,
                }
                updateUserStore(user, userDetailes.user.likedPostsArr, userDetailes.user.likedPeople, userDetailes.user.postArr)
                console.log("user!",storeUser);
                
                setIsReady(true);  // עדכון isReady אחרי שהנתונים נטענו בהצלחה
            } catch (error) {
                console.error(error);
            }
        }
        getMyPersonalDetails()
    }, [])
    console.log("!!!storeUser!", storeUser);
    console.log("!!!!storlikedPeople", storlikedPeople);
    console.log("!!!!storlikedPostsArr", storlikedPostsArr);
    console.log("!!!!storpostArr", storpostArr);

    return (
        <div>
            <PostList />
        </div>

    )
}
export default Home;
