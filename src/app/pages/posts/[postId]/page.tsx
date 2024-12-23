'use client';
import React, { useEffect, useState } from 'react';
import PostModel from '@/app/component/posts/PostModel';
import { useParams } from 'next/navigation';
import { getPost } from '@/app/services/post/post';

const Page = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const decodedPostId = decodeURIComponent(postId as string); // פענוח המזהה
        const fetchedPost = await getPost(1, 10, decodedPostId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <PostModel post={post}  />
    </div>
  );
};

export default Page;
