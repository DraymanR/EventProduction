'use client'
import React from 'react';
import PostDisplay from '@/app/component/posts/PostDisplay';
import { useParams } from 'next/navigation';  

const Page = () => {
  const { selectIndexPost } = useParams();

  // ממירים את הערך לסוג number
  const decodedSelectIndexPost = selectIndexPost ? Number(selectIndexPost) : NaN;

  if (isNaN(decodedSelectIndexPost)) {
    return <div>Invalid Post Index</div>;  // אם לא ניתן להמיר את הערך למספר
  }
console.log(decodedSelectIndexPost);
  return (
    <div>
      <PostDisplay selectIndexPost={decodedSelectIndexPost} />
    </div>
  );
};

export default Page;
