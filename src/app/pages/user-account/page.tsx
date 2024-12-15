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
    const uuser = useUserStore((state) => state.user);

    useEffect(() => {
        const getMyPersonalDetails = async () => {
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
                setIsReady(true);  // עדכון isReady אחרי שהנתונים נטענו בהצלחה
            } catch (error) {
                console.error(error);
            }
        }
        getMyPersonalDetails()
    }, [])
    console.log("!!!!", uuser);

    return (
        <div>
            <PostList />
            {/* <NewPhoto postId={"6751731765569760ca17ec3a"} /> */}
        </div>

    )
}
<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> 9ae9e7a3087546fc2634f0000c5375bf030a299a
