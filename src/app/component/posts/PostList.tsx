// // "use client";
// // import { PostCardProps, EventCategory } from "@/app/types/post"; // ייבוא ה-Enum של סוגי האירועים
// // import SearchBar from "@/app/component/SearchBar";
// // import usePostStore from "@/app/store/postStore";
// // import "@/app/css/posts/customStyles.css";
// // import React, { useState, useEffect } from "react";
// // import { getAllPosts } from "@/app/services/post/post";
// // import PostCard from "./PostCard";
// // import '@/app/globals.css'

// // const PostList = () => {
// //   const { posts, setPosts } = usePostStore();
// //   const [postss, setPostss] = useState<PostCardProps[]>([]); // הגדרת state עם טיפ
// //   const [filteredPosts, setFilteredPosts] = useState<PostCardProps[]>([]);
// //   const [error, setError] = useState<string | null>(null);
// //   const [page, setPage] = useState<number>(1);
// //   const [loading, setLoading] = useState<boolean>(false); // מצב טעינה
// //   const [noMorePosts, setNoMorePosts] = useState<boolean>(false); // מצב של אין יותר פוסטים

// //   const loadPosts = async () => {
// //     if (loading || noMorePosts) return; // אם אנחנו כבר טוענים או שאין יותר פוסטים, לא נבצע טעינה נוספת

// //     setLoading(true); // נעדכן את מצב הטעינה
// //     try {
// //       const data = await getAllPosts(page, 10); // העברת פרמטרים של דף ומספר פריטים

// //       if (data.posts.length === 0) {
// //         setNoMorePosts(true);
// //         return;
// //       }

// //       // הוספת מניעת כפילויות באמצעות ID ייחודי של פוסט
// //       const newPosts = data.posts.filter(
// //         (post: { postId: any }) =>
// //           !posts.some((existingPost) => existingPost.postId === post.postId)
// //       );
// //       setPosts(newPosts);
// //       // עדכון הסטור עם הפוסטים החדשים
// //       setPostss((prevPosts) => [...prevPosts, ...newPosts]);
// //       setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);

// //       setPage((prevPage) => prevPage + 1); // הגדלת הדף

// //       if (newPosts.length < 10) {
// //         setNoMorePosts(true);
// //       }
// //     } catch (err) {
// //       setError("Failed to fetch posts. Please try again later.");
// //       console.error("Error loading posts:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // eslint-disable-next-line react-hooks/exhaustive-deps
// //   const handleScroll = () => {
// //     const bottom =
// //       window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100;
// //     if (bottom) {
// //       loadPosts();
// //     }
// //   };

// //   const handleSearch = (
// //     userName: string,
// //     eventTitle: string,
// //     eventType: EventCategory,
// //     startDate: string,
// //     endDate: string,
// //     description: string
// //   ) => {
// //     const results = posts.filter((post) => {
// //       const matchUserName = post.userName.toLowerCase().includes(userName.toLowerCase());
// //       const matchEventTitle = post.title.toLowerCase().includes(eventTitle.toLowerCase());
// //       const matchEventType = eventType ? post.postId?.eventCategory === eventType : true;
// //       const matchDescription = post.description?.toLowerCase().includes(description.toLowerCase());
// //       const postDate = new Date(post.createDate);
// //       const isWithinDateRange =
// //         (!startDate || postDate >= new Date(startDate)) &&
// //         (!endDate || postDate <= new Date(endDate));

// //       return (
// //         matchUserName &&
// //         matchEventTitle &&
// //         matchEventType &&
// //         matchDescription &&
// //         isWithinDateRange
// //       );
// //     });
// //     setFilteredPosts(results);
// //   };

// //   useEffect(() => {
// //     window.addEventListener("scroll", handleScroll);
// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, [handleScroll, loading, noMorePosts]);

// //   useEffect(() => {
// //     loadPosts();
// //   }, []);

// //   if (error) {
// //     return (
// //       <div className="error-message">{error}</div>
// //     );
// //   }

// //   return (
// //     <div className="posts-container">
// //       <h1 className="posts-title">פוסטים</h1>
// //       <div className="search-bar-container">
// //         <SearchBar onSearch={handleSearch} />
// //       </div>
// //       <div className="posts-list">
// //         {filteredPosts.map((post: PostCardProps, index: number) => (
// //           <PostCard key={index} post={post} />
// //         ))}
// //       </div>
// //       {loading && (
// //         <div className="loading-text">טוען...</div>
// //       )}
// //       {noMorePosts && (
// //         <div className="no-more-posts-text">אין יותר פוסטים לטעון</div>
// //       )}
// //     </div>
// //   );

// // };


// "use client";
// import { PostCardProps, EventCategory } from "@/app/types/post"; 
// import SearchBar from "@/app/component/SearchBar";
// import usePostStore from "@/app/store/postStore";
// import "@/app/css/posts/customStyles.css";
// import React, { useState, useEffect } from "react";
// import { getAllPosts } from "@/app/services/post/post";
// import PostCard from "./PostCard";
// import "@/app/globals.css";

// const PostList = () => {
//   const { posts, setPosts } = usePostStore();
//   const [postss, setPostss] = useState<PostCardProps[]>([]); 
//   const [filteredPosts, setFilteredPosts] = useState<PostCardProps[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false); 
//   const [noMorePosts, setNoMorePosts] = useState<boolean>(false); 
//   const [totalPages, setTotalPages] = useState<number>(1);

//   const loadPosts = async () => {
//     if (loading || noMorePosts) return; 

//     setLoading(true);
//     try {
//       const data = await getAllPosts(page, 10); 

//       if (data.posts.length === 0) {
//         setNoMorePosts(true);
//         return;
//       }

//       const newPosts = data.posts.filter(
//         (post: { postId: any }) =>
//           !posts.some((existingPost) => existingPost.postId === post.postId)
//       );

//       if (newPosts.length < 10) {
//         setNoMorePosts(true); 
//       }

//       setPosts(newPosts);
//       setPostss((prevPosts) => [...prevPosts, ...newPosts]);
//       setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);

//       setTotalPages(data.totalPages); 

//     } catch (err) {
//       setError("Failed to fetch posts. Please try again later.");
//       console.error("Error loading posts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (
//     userName: string,
//     eventTitle: string,
//     eventType: EventCategory,
//     startDate: string,
//     endDate: string,
//     description: string
//   ) => {
//     const results = posts.filter((post) => {
//       const matchUserName = post.userName.toLowerCase().includes(userName.toLowerCase());
//       const matchEventTitle = post.title.toLowerCase().includes(eventTitle.toLowerCase());
//       const matchEventType = eventType ? post.postId?.eventCategory === eventType : true;
//       const matchDescription = post.description?.toLowerCase().includes(description.toLowerCase());
//       const postDate = new Date(post.createDate);
//       const isWithinDateRange =
//         (!startDate || postDate >= new Date(startDate)) &&
//         (!endDate || postDate <= new Date(endDate));

//       return (
//         matchUserName &&
//         matchEventTitle &&
//         matchEventType &&
//         matchDescription &&
//         isWithinDateRange
//       );
//     });
//     setFilteredPosts(results);
//   };

//   useEffect(() => {
//     loadPosts();
//   }, [page]); 

//   const handlePageChange = (newPage: number) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setPage(newPage);
//   };

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <div className="posts-container">
//       <h1 className="posts-title">פוסטים</h1>
//       <div className="search-bar-container">
//         <SearchBar onSearch={handleSearch} />
//       </div>
//       <div className="posts-list">
//         {filteredPosts.map((post: PostCardProps, index: number) => (
//           <PostCard key={index} post={post} />
//         ))}
//       </div>
//       {loading && <div className="loading-text">טוען...</div>}
//       {noMorePosts && <div className="no-more-posts-text">אין יותר פוסטים לטעון</div>}

//       {/* Pagination with Page Numbers */}
//       <div className="pagination flex justify-center items-center gap-4 mt-6">
//         <button
//           className="pagination-arrow text-xl p-2 rounded-full hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
//           onClick={() => handlePageChange(page - 1)}
//           disabled={page === 1}
//         >
//           ↑
//         </button>
//         <span className="font-semibold text-lg">
//           עמוד {page} מתוך {totalPages}
//         </span>
//         <button
//           className="pagination-arrow text-xl p-2 rounded-full hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
//           onClick={() => handlePageChange(page + 1)}
//           disabled={page === totalPages}
//         >
//           ↓
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostList;
"use client";
import { PostCardProps, EventCategory } from "@/app/types/post"; 
import SearchBar from "@/app/component/SearchBar";
import usePostStore from "@/app/store/postStore";
import "@/app/css/posts/customStyles.css";
import React, { useState, useEffect } from "react";
import { getAllPosts } from "@/app/services/post/post";
import PostCard from "./PostCard";
import "@/app/globals.css";

const PostList = () => {
  const { posts, setPosts } = usePostStore();
  const [postss, setPostss] = useState<PostCardProps[]>([]); 
  const [filteredPosts, setFilteredPosts] = useState<PostCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false); 
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false); 
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadPosts = async () => {
    if (loading || noMorePosts) return; 

    setLoading(true);
    try {
      const data = await getAllPosts(page, 10); 

      if (data.posts.length === 0) {
        setNoMorePosts(true);
        return;
      }

      const newPosts = data.posts.filter(
        (post: { postId: any }) =>
          !posts.some((existingPost) => existingPost.postId === post.postId)
      );

      if (newPosts.length < 10) {
        setNoMorePosts(true); 
      }

      setPosts(newPosts);
      setPostss((prevPosts) => [...prevPosts, ...newPosts]);
      setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);

      setTotalPages(data.totalPages); 

    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (
    userName: string,
    eventTitle: string,
    eventType: EventCategory,
    startDate: string,
    endDate: string,
    description: string
  ) => {
    const results = posts.filter((post) => {
      const matchUserName = post.userName.toLowerCase().includes(userName.toLowerCase());
      const matchEventTitle = post.title.toLowerCase().includes(eventTitle.toLowerCase());
      const matchEventType = eventType ? post.postId?.eventCategory === eventType : true;
      const matchDescription = post.description?.toLowerCase().includes(description.toLowerCase());
      const postDate = new Date(post.createDate);
      const isWithinDateRange =
        (!startDate || postDate >= new Date(startDate)) &&
        (!endDate || postDate <= new Date(endDate));

      return (
        matchUserName &&
        matchEventTitle &&
        matchEventType &&
        matchDescription &&
        isWithinDateRange
      );
    });
    setFilteredPosts(results);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">פוסטים</h1>
      
      <div className="max-w-3xl mx-auto mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredPosts.map((post: PostCardProps, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </div>

      {loading && <div className="text-center text-gray-600">טוען...</div>}
      {noMorePosts && <div className="text-center text-gray-500">אין יותר פוסטים לטעון</div>}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          ↑
        </button>
        <span className="font-semibold text-lg text-gray-800">
          עמוד {page} מתוך {totalPages}
        </span>
        <button
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-400"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default PostList;
