import { ObjectId } from "mongoose";
export enum Title {
  Supplier = 'supplier',
  MakeupArtist = 'Makeup artist',
  Photographer = 'photographer',
  SoundEngineer = 'sound engineer',
  EventDesigner = 'event designer',
  Orchestra = 'orchestra',
  Singer = 'singer',
  // תוסיפי עוד טייטלים לפי הצורך
}

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

export interface User {
  firstName: string;
  lastName: string;
  userName: string; // unique
  email: string; // unique
  titles:(Title | "consumer")[]; // מערך של טיטלים
  phone: string;
  languages: [Language]; // מערך של שפות
  addressId: ObjectId; // reference to Address
  description: string;
  postArr: ObjectId[]; // מערך של פוסטים
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

export interface Consumer {
  userName: string;
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
  postId: ObjectId;
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
  titles:(Title | "consumer")[];
  phone: string;
  description: string,
  languages: [Language]; 
  address: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  supplierDetails?: {
    startingPrice: number;
    topPrice: number;
    eventList: string[];
    recommendation: string[];
    range: number;
    emptyDate: string[];
    images: string[];
    description: string;
  };
}
