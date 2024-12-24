
export const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    // Fallback for development
    return process.env.NODE_ENV === 'production' 
      ? 'https://event-production-git-main-riva-draimans-projects.vercel.app' 
      : 'http://localhost:3000';
  };