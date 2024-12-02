import mongoose, { Schema, Document } from 'mongoose';
import { User, Address, Supplier, Recommendation, Post, ConsumerPost, Auth, Consumer, Img } from '@/app/types/user';


const userSchema = new Schema<User>({
  _id: { type: Schema.Types.ObjectId },
  userName: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  title: {
    type: String,
    enum: ['supplier', 'consumer', 'Makeup artist', 'photographer', 'sound engineer', 'event designer', 'orchestra', 'singer',],
    required: true
  },
  phone: { type: String, required: true },
  language: {
    type: String,
    enum: ['Hebrew', 'English', 'French', 'Yiddish', 'Spanish', 'Russian'],
    required: true
  },
  addressId: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  description: { type: String, required: true },
  postArr: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

const addressSchema = new Schema<Address>({
  userName: { type: String, ref: 'User', required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  building: { type: Number, required: true },
});

const ImgSchema = new Schema<Img>({
  imgUrl: { type: String, ref: 'Img', required: true }
})


const supplierSchema = new Schema<Supplier>({
  userName: { type: String, ref: 'User', required: true },
  startingPrice: { type: Number, required: true },
  topPrice: { type: Number, required: true },
  range: { type: Number, required: true },
});

const consumerSchema = new Schema<Consumer>({
  userName: { type: String, ref: 'User', required: true }, // הפניה למודל User
  likedPostsArr: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // הפניה לפוסטים שאהב
  likedPeople: [{ type: String }], // שמות משתמשים של אנשים שאהב
});


const postSchema = new Schema<Post>({
  userName: { type: String, ref: 'User', required: true },
  createDate: { type: Date, required: true },
  album: [{ type: String, required: true }],
  title: { type: String, required: true },
  description: { type: String, required: true },
  recommendations: [{ type: Schema.Types.ObjectId, ref: 'Recommendation' }],
  postId: { type: Schema.Types.ObjectId, ref: 'ConsumerPost' }
});


const consumerPostSchema = new Schema<ConsumerPost>({
  eventCategory: {
    type: String,
    enum: ['barmitzva', 'wedding', 'bat mitzva', 'engagement', 'birthday', 'family party', 'other'],
    required: true
  },
  supplierNameArr: [{ type: String, required: true }], // רשימת ספקים
  budget: { type: Number, required: true },
});

const recommendationSchema = new Schema<Recommendation>({
  userName: { type: String, required: true }, // הפניה למשתמש שנותן את ההמלצה
  text: { type: String, required: true },
  rate: { type: Number, required: true, min: 1, max: 5 }, // דירוג בין 1 ל-5
});



const AddressModel = mongoose.models.Address || mongoose.model<Address>('Address', addressSchema);
const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);
const SupplierModel = mongoose.models.Supplier || mongoose.model<Supplier>('Supplier', supplierSchema);
const ConsumerModel = mongoose.models.Consumer || mongoose.model<Consumer>('Consumer', consumerSchema);
const PostModel = mongoose.models.Post || mongoose.model<Post>('Post', postSchema);
const ConsumerPostModel = mongoose.models.ConsumerPost || mongoose.model<ConsumerPost>('ConsumerPost', consumerPostSchema);
const RecommendationModel = mongoose.models.Recommendation || mongoose.model<Recommendation>('Recommendation', recommendationSchema);
const ImgModel = mongoose.models.Img || mongoose.model<Img>('Img', ImgSchema);

export {
  AddressModel,
  UserModel,
  SupplierModel,
  ConsumerModel,
  PostModel,
  ConsumerPostModel,
  RecommendationModel,
  ImgModel
};
