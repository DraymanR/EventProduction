'use client'
import NewPhoto from '@/app/component/posts/ImageUploader'
import PostList from '@/app/component/posts/PostList';
import { getMyDetails } from '@/app/services/user/getDetails';
import useUserModal from '@/app/store/userModel';
import { useEffect } from 'react';
const Home = () => {
const myDetailes = useUserModal
    useEffect(() => {
        const getMyPersonalDetails = async () => {
            try {
                const response = await getMyDetails();
                // const userData = convertToPosts(events.posts);
                console.log(response.user);

                // setMyEvents(events); // מעדכן את המצב
            } catch (error) {
                console.error(error);
            }
        }
        getMyPersonalDetails()
    }, [])

    return (
        <div>
            <PostList />
            {/* <NewPhoto postId={"6751731765569760ca17ec3a"} /> */}
        </div>

    )
}
export default Home;