import { Types } from "mongoose";

export interface User {
  _id?: string; // `_id` is optional to avoid TypeScript errors
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  title: 'supplier' | 'consumer';
  phone: string;
  language: 'Hebrew' | 'English' | 'French' | 'Yiddish' | 'Spanish' | 'Russian';
  addressId: string;
}


export interface Address {
  zipCode: string;
  city: string;
  street: string;
  building: number;
}

export interface Supplier {
  userId: Types.ObjectId;
  sartingPrice: number;
  topPrice: number;
  eventList: Types.ObjectId[];
  recommendation: Types.ObjectId[];
  range: number;
  emptyDate: Date[];
  images: string[];
  description: string;
}

export interface Event {
  status: 'waiting' | 'inProcess' | 'done'; // Enum values
  date: Date;
  consumeId: Types.ObjectId;
  eventCategory: 'barmitzva' | 'wedding' | 'breit' | 'bat mitzva' | 'engagement' | 'birthday' | 'family party' | 'other';  // Enum values
  addressId: Types.ObjectId;
}

export interface ConsumerEvent {
  supplierIdArr: Types.ObjectId[];
  albom: string[];
  eventId: Types.ObjectId;
  budget: number;
  reminders: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  text: string;
  rate: number; // 1-5 rating in the model
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface UsersResponse {
  users: User[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}


