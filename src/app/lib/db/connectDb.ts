import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {


  console.log('inside the connectDB function , still did nothing :)')
   try{
    const MONGODB_URI = process.env.MONGODB_URI ;
    console.log(MONGODB_URI);

    if (!MONGODB_URI) {
      throw new Error('Missing MONGO_URI in environment variables');
    }

    // Check if we have a cached connection
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
      return;
    }

    // If not connected, establish a new connection
    await mongoose.connect(MONGODB_URI, {
      // These options help with connection stability
      serverSelectionTimeoutMS: 5000,
      retryWrites: true
    });

    console.log('Connected to MongoDB');

    // Optional: Add event listeners for connection monitoring
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

  } catch (error) {
    console.error("Database connection error:", error);
    // Optionally, you could implement a retry mechanism here
    throw new Error("Failed to connect to database");
  }
}

export default connectDb;
