export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  title: 'supplier' | 'consumer';
  phone: string;
  language: 'Hebrew' | 'English' | 'French' | 'Yiddish' | 'Spanish' | 'Russian'
  addressId: string;
}
export interface Auth {
  email: string,
  password: string,
  otp: String,
  otpExpiration: Date,

}

export interface Address {
  zipCode: string;
  city: string;
  street: string;
  building: number;
  userId: number
}

export interface Supplier {
  userId: number;
  sartingPrice: number;
  topPrice: number;
  eventList: Event[];
  recommendation: Recommendation[];
  range: number;
  emptyDate: Date[];
  images: string[];
  description: string;
}

export interface Event {
  status: 'waiting' | 'inProcess' | 'done'; // Enum values
  date: Date;
  consumeId: number;
  eventCategory: 'barmitzva' | 'wedding' | 'breit' | 'bat mitzva' | 'engagement' | 'birthday' | 'family party' | 'other';  // Enum values
  addressId: number;
}

export interface ConsumerEvent {
  supplierIdArr: number[];
  albom: string[];
  eventId: number;
  budget: number;
  reminders: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  text: string;
  rate: number; // 1-5 rating in the model
}
