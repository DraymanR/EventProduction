import mongoose, { Schema, Document } from 'mongoose';
import { User, Address, Supplier, Event, ConsumerEvent, Recommendation, Auth } from '@/app/types/user';

const addressSchema = new Schema<Address>({
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: Number, required: true },
  userId: { type: Number, ref: 'User', required: true }, // הוספת שדה userId לכל כתובת
});

const authSchema = new Schema<Auth>({
  email: { type: String, ref: 'User', required: true },
  password: { type: String, required: true },
  otp: { type: String, default: null,},
  otpExpiration: { type: Date, default: null,},
});

const recommendationSchema = new Schema<Recommendation>({
  text: { type: String, required: true },
  rate: { type: Number, required: true, min: 1, max: 5 },
});

const eventSchema = new Schema<Event>({
  status: { type: String, enum: ['waiting', 'inProcess', 'done'], required: true },
  date: { type: Date, required: true },
  consumeId: { type: Number, required: true },
  eventCategory: { type: String, enum: ['barmitzva', 'wedding', 'breit', 'bat mitzva', 'engagement', 'birthday', 'family party', 'other'], required: true },
  addressId: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
});

const supplierSchema = new Schema<Supplier>({
  userId: { type: Number, ref: 'User', required: true },
  sartingPrice: { type: Number, required: true },
  topPrice: { type: Number, required: true },
  eventList: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  recommendation: [recommendationSchema],
  range: { type: Number, required: true },
  emptyDate: { type: Date, required: true },
  images: [{ type: String }],
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String, enum: ['supplier', 'consumer'], required: true },
  phone: { type: String, required: true },
  language: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address', required: true }
});

const consumerEventSchema = new Schema<ConsumerEvent>({
  supplierIdArr: [{ type: Number, required: true }],
  albom: [{ type: String, required: true }],
  eventId: { type: Number, required: true },
  budget: { type: Number, required: true },
  reminders: [{ type: String }],
  recommendations: [recommendationSchema],
});

const AddressModel = mongoose.models.User || mongoose.model<Address>('Address', addressSchema);
const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);
const SupplierModel = mongoose.models.Supplier || mongoose.model<Supplier>('Supplier', supplierSchema);
const EventModel = mongoose.models.Event || mongoose.model<Event>('Event', eventSchema);
const ConsumerEventModel = mongoose.models.ConsumerEvent || mongoose.model<ConsumerEvent>('ConsumerEvent', consumerEventSchema);
const AuthModel = mongoose.models.Auth || mongoose.model('Auth', authSchema);
export { UserModel, SupplierModel, EventModel, ConsumerEventModel, AuthModel, AddressModel };
