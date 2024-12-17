'use client'
import PostList from "@/app/component/posts/PostList";
import ShowUser from "./component/users/showUser";
const Home = () => {


  return (

      <div>
        {/* <PostList/> */}
        <ShowUser userName="יהודה כהן" />
    </div>
  );
};

export default Home;
