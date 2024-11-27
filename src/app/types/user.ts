import { ObjectId } from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  userName: string; // unique
  email: string; // unique
  title: 'supplier' | 'consumer' | 'Makeup artist' | 'photographer' | 'sound engineer' | 'event designer' | 'orchestra' | 'singer' | string; // אפשר להוסיף עוד בעלי מקצוע
  phone: string;
  language: 'Hebrew' | 'English' | 'French' | 'Yiddish' | 'Spanish' | 'Russian';
  addressId: ObjectId; // reference to Address
  description: string;
}

export interface Auth {
  email: string,
  password: string,
  otp: String,
  otpExpiration: Date,

}
export interface Supplier {
  userName: string; 
  startingPrice: number;
  topPrice: number;
  supplierPostArr: ObjectId[];
  range: number; // maximum distance they will serve

}

export interface Consumer {
  userName: string; 
  consumerPostArr: ObjectId[]; // array of ConsumerPost ObjectIds
  likedPostsArr: ObjectId[]; // array of Post ObjectIds
  likedPeople: string[]; // array of Usernames
}

export interface Address {
  userName: string;
  zipCode: string;
  city: string;
  street: string;
  building: number;
}

export interface Post {
  createDate: Date;
  userName: string;
  album: string[]; 
  title: string;
  description: string;
  recommendations: ObjectId[]; 
}

export interface SupplierPost {
  postId:ObjectId;
  description: string;
 
}
export interface ConsumerPost {
  postId:ObjectId;
  eventCategory: 'barmitzva' | 'wedding' | 'bat mitzva' | 'engagement' | 'birthday' | 'family party' | 'other';
  supplierNameArr: string[];
  budget: number;
}

export interface Recommendation {
  userName: string; // reference to User
  text: string;
  rate: number; // rating 1-5
}
