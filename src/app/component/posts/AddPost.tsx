"use client";
import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import "@/app/css/posts/AddPost.css";
import { addingMyPost } from "@/app/services/post/post";
import useModalStore from "@/app/store/modelStore";
import useUserStore from "@/app/store/userModel";
import '@/app/globals.css';
import { getAllUsers } from "@/app/services/user/getDetails";
import connectDb from "@/app/lib/db/connectDb";
import { UserModel } from "@/app/lib/models/user";
import { User } from "@/app/types/user";



const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventCategory, setEventCategory] = useState<string>("barmitzva");
  const [album, setAlbum] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [isConsumer, setIsConsumer] = useState<boolean>(true);
  const [supplierNameArr, setSupplierNameArr] = useState<MultiValue<string>>([]);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<{ value: string; label: string }[]>([]); // סטייט עבור הספקים

  const closeModal = useModalStore((state) => state.closeModal);
  const setPostArr = useUserStore((state) => state.setPostArr);
  // async function getUsers(): Promise<User[]> {
  //   try {
  //     await connectDb();
  //     const users = await UserModel.find().lean<User[]>();
  
  //     return users.map(user => ({
  //       ...user,
  //     }));
  //   } catch (error) {
  //     console.error('Error in getUsers:', error);
  //     return [];
  //   }
  // }
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllUsers();
        const filteredSuppliers = data.users
          .filter((user: any) => user.titles.includes('consumer') && user.titles.length > 1) // בדוק שיש title נוסף חוץ מ־consumer
          .map((user: any) => user.userName); // הוצאת userName בלבד
          console.log("filteredSuppliers",filteredSuppliers);
          
        const supplierOptions = filteredSuppliers.map((user:string) => ({
          value: user,
          label: user,
        }));
        console.log("supplierOptions",supplierOptions);
        
        setSuppliers(supplierOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchSuppliers();
  }, []); // פועל רק פעם אחת בזמן טעינת הקומפוננטה

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileReaders = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });

      Promise.all(fileReaders).then((uploadedImages) => {
        setAlbum((prev) => [...prev, ...uploadedImages]);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("יש לאשר את התנאים לפני המשך");
      return;
    }

    const newPost = {
      title,
      description,
      album,
      eventCategory,
      budget,
      supplierNameArr,
      isConsumer,
    };

    console.log("Post Created: ", newPost);
    const pp = await addingMyPost(newPost)
    closeModal()
    setPostArr(pp.post)
    alert("הפוסט נוסף בהצלחה!");
    setTitle("");
    setDescription("");
    setEventCategory("barmitzva");
    setSupplierNameArr([])
    setAlbum([]);
    setBudget(0);
    setAcceptedTerms(false);
  };

  return (
    <form className="add-post" onSubmit={handleSubmit}>
      <h2>הוספת פוסט חדש</h2>
      <p>את מוזמנת לשתף את האירוע החדש שלך !!</p>

      <label>
        כותרת:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        סוג אירוע:
        <select
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
          required
        >
          <option value="barmitzva">בר מצווה</option>
          <option value="wedding">חתונה</option>
          <option value="bat mitzva">בת מצווה</option>
          <option value="engagement">אירוסין</option>
          <option value="birthday">יום הולדת</option>
          <option value="family party">מסיבת משפחה</option>
          <option value="other">אחר</option>
        </select>
      </label>

      {/* <div style={{ width: "300px" }}> */}
      <label>
        הספקים שלי:
        <Select
          options={suppliers}
          // options={suppliers.map((supplier) => ({ value: supplier, label: supplier }))} // מיפוי לערכים ש-React-Select מבין
          isMulti // מאפשר בחירה מרובה
          placeholder="בחר ספקים..."
          onChange={(selectedOptions) => setSupplierNameArr(selectedOptions.map((option) => option.value))}
          value={supplierNameArr.map((supplier) => ({ value: supplier, label: supplier }))}
        />
      </label>
      <label>
        תיאור האירוע:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        תקציב האירוע:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          required
        />
      </label>

      <label>
        העלאת תמונות:
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          required
        />
        אני מאשרת את התנאים
      </label>

      <button type="submit" className="button-primary">הוספת פוסט</button>
    </form>
  );
};

export default AddPost;
