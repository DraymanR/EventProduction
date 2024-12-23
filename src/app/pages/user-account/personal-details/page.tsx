"use client";

import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import useUserStore from "@/app/store/userModel";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const userDetails = useUserStore((state) => state.user);
  useEffect(() => {
    console.log("Updated userDetails:", userDetails);
  }, [userDetails]);
  // const isReady = useUserStore((state) => state.isReady);
  // if (!isReady) {
  //     // return <p>Loading...</p>;
  // }
  return (
    <div dir="ltr">
      {userDetails ? (
        <ShowUserPersonalDetails user={userDetails}></ShowUserPersonalDetails>
      ) : (
        <p>No user data found</p>
      )}
    </div>
  );
};
export default Home;
