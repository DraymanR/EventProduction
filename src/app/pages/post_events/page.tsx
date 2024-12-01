"use client";

import PostEvent from "@/app/component/PostEvent";

const page = () => {
  const post = {
    createDate: new Date(),
    userName: "אסתר כהן",
    album: ["https://www.google.com/imgres?q=%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA%20%D7%9C%D7%97%D7%AA%D7%95%D7%A0%D7%94%20%D7%9C%D7%94%D7%95%D7%A8%D7%93%D7%94&imgurl=https%3A%2F%2Fysp-shop.co.il%2Fwp-content%2Fuploads%2F2024%2F05%2FM06.jpg&imgrefurl=https%3A%2F%2Fysp-shop.co.il%2Fproduct%2F%25D7%2594%25D7%2596%25D7%259E%25D7%25A0%25D7%2594-%25D7%259C%25D7%2597%25D7%25AA%25D7%2595%25D7%25A0%25D7%2594-006%2F&docid=wNrAg8SipK5hVM&tbnid=YdKjPnN-tF8EzM&vet=12ahUKEwia-8CY3P6JAxWyVaQEHZNaJW4QM3oECEAQAA..i&w=600&h=600&hcb=2&ved=2ahUKEwia-8CY3P6JAxWyVaQEHZNaJW4QM3oECEAQAA", "https://www.shutterstock.com/image-photo/wedding-rings-on-bouquet-white-roses-2448348549"],
    title: "חתונת הכסף של ההורים היקרים שלי",
    description: "מצורף פה תמונות של אירוע חתונת הכסף שחגגנו להורים היקרים שלנו...",
    recommendations: [],
    postId: "123456" as any,
  };

  const recommendations = [
    { userName: "משתמש1", text: "היה אירוע מהמם!", rate: 5},
    { userName: "משתמש2", text: "נהניתי מכל רגע!", rate: 5 },
  ];

  return (
    <div>
      <PostEvent post={post} recommendations={recommendations} />
    </div>
  );
};

export default page;
