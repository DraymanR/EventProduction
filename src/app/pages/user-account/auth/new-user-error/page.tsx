
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function NewUserError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleLoginClick = () => {
    router.push('/pages/PopUpWindow'); // Update to match your login page path
  };
  console.log(" inside the new user error ");

  return (
    <div>
      <h1>Access Denied</h1>
      {error && <p>Error: {error}</p>}
      <p>You are not registered in our system. Please sign in with your username and password first.</p>
      <button onClick={handleLoginClick}>
        Go to Login
      </button>
    </div>
  );
}