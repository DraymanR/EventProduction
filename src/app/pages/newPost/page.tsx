"use client"

import NewPost from '@/app/component/ImageUploader';

export default function postPage() {
    const postId = '674860a685305bb617a4fbc6';  // This could come from state, context, or a previous API call

    return <NewPost postId={postId} />;

}


