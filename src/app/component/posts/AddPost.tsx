"use client";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import "@/app/css/posts/AddPost.css";
import { addingMyPost } from "../../services/post/post";
import useModalStore from "../../store/modelPop-upWindow";
import useUserStore from "@/app/store/userModel";
import '@/app/globals.css';


const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventCategory, setEventCategory] = useState<string>("barmitzva");
  const [album, setAlbum] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [isConsumer, setIsConsumer] = useState<boolean>(true);
  const [supplierNameArr, setSupplierNameArr] = useState<MultiValue<string>>([]);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const closeModal = useModalStore((state) => state.closeModal);
    const setPostArr = useUserStore((state) => state.setPostArr);


  // רשימת הספקים
  const suppliers: string[] = ["Supplier 1", "Supplier 2", "Supplier 3"];

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
    console.log("pp",pp);
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
          options={suppliers.map((supplier) => ({ value: supplier, label: supplier }))} // מיפוי לערכים ש-React-Select מבין
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
