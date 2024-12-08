"use client";
import React, { useState } from "react";
import "./AddPost.css";

const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventCategory, setEventCategory] = useState<string>("barmitzva");
  const [location, setLocation] = useState<string>("צפון");
  const [album, setAlbum] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert("יש לאשר את התנאים לפני המשך");
      return;
    }

    const newPost = {
      title,
      description,
      eventCategory,
      location,
      album,
      budget,
      createDate: new Date(),
      userName: "currentUser",
      recommendations: [],
      postId: new Date().getTime(),
    };

    console.log("Post Created: ", newPost);

    // שמירת הפוסט או שליחה לשרת
    alert("הפוסט נוסף בהצלחה!");
    setTitle("");
    setDescription("");
    setEventCategory("barmitzva");
    setLocation("צפון");
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

      <label>
        מיקום האירוע:
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="צפון">צפון</option>
          <option value="מרכז">מרכז</option>
          <option value="דרום">דרום</option>
        </select>
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
      {/* <div className="image-preview">
        {album.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`uploaded-${index}`}
            className="preview-image"
          />
        ))}
      </div> */}

      <label>
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          required
        />
        אני מאשרת את התנאים
      </label>

      <button type="submit">הוספת פוסט</button>
    </form>
  );
};

export default AddPost;
