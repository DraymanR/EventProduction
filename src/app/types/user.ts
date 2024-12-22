import { ObjectId } from "mongoose";
import { UploadApiResponse } from 'cloudinary';

export interface SupplierDetails {
  startingPrice: number;
  topPrice: number;

}
export enum Title {
  Supplier = 'ספק/ית',
  MakeupArtist = 'מאפר/ת',
  Photographer = 'צלם/ת',
  SoundEngineer = 'סאונדמן/ית',
  EventDesigner = 'מעצב/ת אירועים',
  Singer = 'זמר/ת',

  // תוסיפי עוד טייטלים לפי הצורך
}
export type Option = {
  value: string;
  label: string;
};
export enum Language {
  Hebrew = 'Hebrew',
  English = 'English',
  French = 'French',
  Yiddish = 'Yiddish',
  Spanish = 'Spanish',
  Russian = 'Russian',
  // תוסיפי עוד שפות לפי הצורך
}

export enum EventCategory {
  Barmitzva = 'barmitzva',
  Wedding = 'wedding',
  BatMitzva = 'bat mitzva',
  Engagement = 'engagement',
  Birthday = 'birthday',
  FamilyParty = 'family party',
  Other = 'other',
}
export interface PostCardProps {
    eventCategory: EventCategory;
  _id: string,
  recommendations: [Recommendation];
  album: [Img];
    createDate: string | number | Date;
  title: string;
  description: string;
  userName: string,

  userDetails: {titles:[string]},
  postId: {
  budget: number,
    eventCategory
    :
  EventCategory,
    supplierNameArr
    : [string]
};
}

export interface User {

  // _id: ObjectId;
  firstName: string;
  lastName: string;
  userName: string; // unique
  email: string; // unique
  titles: (Title | "consumer")[]; // מערך של טיטלים
  // titles: (Title | "consumer")[]; // מערך של טיטלים
  phone: string;
  languages: [Language]; // מערך של שפות
  addressId: ObjectId; // reference to Address
  description: string;
  postArr: ObjectId[];
  likedPostsArr: ObjectId[]; // array of Post ObjectIds
  likedPeople: string[];
  profileImage: string;   // מערך של פוסטים
}

export interface Auth {
  userName: string,
  email: string,
  password: string,
  otp: String,
  otpExpiration: Date,

}
export interface Supplier {
  userName: string;
  startingPrice: number;
  topPrice: number;
  range: number; // maximum distance they will serve
}

// export interface Consumer {
//   userName: string;
//    // array of Usernames
// }

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
  postId: ObjectId;
}
export interface PostEventProps {
  createDate: Date;
  userName: string;
  album: string[];
  title: string;
  description: string;
  recommendations: ObjectId[];
  eventCategory: EventCategory;
  supplierNameArr: string[];
  budget: number;
}

export interface Img {
  imgUrl: string
}

export interface ConsumerPost {
  eventCategory: EventCategory;
  supplierNameArr: string[];
  budget: number;
}

export interface Recommendation {
  userName: string; // reference to User
  text: string;
  rate: number; // rating 1-5
}
export interface UserFormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  titles: (Title | "consumer")[];//string[];
  phone: string;
  description: string;
  languages: Language[];
  // address: Address
  address: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  supplierDetails?: SupplierDetails;
  profileImage: string | null;
}
export interface UserResponseData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  titles: (Title | "consumer" | null)[]; // אם `titles` יכול להיות `null`
  phone: string;
  description: string;
  languages: Language[];
  addressId: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  profileImage: string | null;
  likedPeople: string[];
  likedPostsArr: Post[];
  postArr: Post[];
}

// export interface UserFormData {
//   profileImage: string,
//   firstName: string;
//   lastName: string;
//   userName: string;
//   email: string;
//   password: string;
//   titles: (Title | "consumer")[]; // מערך של טיטלים
//   phone: string;
//   languages: Language[]; // מערך של שפות
//   address: {
//     zipCode: string;
//     city: string;
//     street: string;
//     building: number;
//   };
//   description: string,

//   supplierDetails?: {
//     startingPrice: number;
//     topPrice: number;
//     eventList: string[];
//     recommendation: string[];
//     range: number;
//     emptyDate: string[];
//     images: string[];
//     description: string;
//   };
// }
export interface UserFormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  titles: (Title | "consumer")[];//string[];
  phone: string;
  description: string;
  languages: Language[];
  // address: Address
  address: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  supplierDetails?: SupplierDetails;
  profileImage: string | null;
}
export interface UserResponseData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  titles: (Title | "consumer" | null)[]; // אם `titles` יכול להיות `null`
  phone: string;
  description: string;
  languages: Language[];
  addressId: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  profileImage: string | null;
  likedPeople: string[];
  likedPostsArr: Post[];
  postArr: Post[];
}

