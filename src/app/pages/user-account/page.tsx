'use client'
import NewPhoto from '@/app/component/posts/ImageUploader'
import PostList from '@/app/component/posts/PostList';
const Home = () => {
    return (
        <div>
        <PostList/>
        {/* <NewPhoto postId={"6751731765569760ca17ec3a"} /> */}
        </div>

    )
}
export default Home;