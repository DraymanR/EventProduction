import { ObjectId } from "mongoose";


export interface Post {
  createDate: Date;
  userName: string;
  album: string[];
  title: string;
  description: string;
  recommendations: ObjectId[];
  postId: ObjectId;
}

export interface PostCardProps {
  userDetails: any;
  eventCategory: EventCategory;
  postId: any;
  _id: string;
  userName: string;
  createDate: Date;
  album: string[];
  title: string;
  description: string;
  recommendations: {
    _id: string;
    userName: string;
    text: string;
    rate: number;
  }[];
}


export interface FavoriteEventProps {
    favoritePosts: PostCardProps[];
  }
  
  export interface PostEventProps {
    post: Post;
    recommendations: ObjectId[];
    // recommendations: Recommendation[];
  }
  
  export interface ConsumerPost {
    eventCategory: EventCategory;
    supplierNameArr: string[];
    budget: number;
  }
  

  export interface PostModalProps {
    post: PostCardProps;
    onClose: () => void;
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
  
export enum EventCategory {
  Barmitzva = "barmitzva",
  Wedding = "wedding",
  BatMitzva = "bat mitzva",
  Engagement = "engagement",
  Birthday = "birthday",
  FamilyParty = "family party",
  Other = "other",
}


export interface Recommendation {
    userName: string; // reference to User
    text: string;
    rate: number; // rating 1-5
  }

  