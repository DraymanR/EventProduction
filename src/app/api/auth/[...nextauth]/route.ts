
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDb from '@/app/lib/db/connectDb'
import { UserModel } from '@/app/lib/models/user'
import { Title , Language} from "@/app/types/user"
import mongoose from "mongoose"

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials')
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Connect to database
      await connectDb();

      try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user if not exists
          await UserModel.create({
            _id: new mongoose.Types.ObjectId(),
            userName: user.name?.replace(/\s+/g, '_').toLowerCase() || 'user',
            firstName: user.name?.split(' ')[0] || '',
            lastName: user.name?.split(' ').slice(1).join(' ') || '',
            email: user.email!,
            title:[ Title.Consumer ], // Default title
            phone: '', // You might want to add a way to collect this
            languages: [ Language.Hebrew ], // Default language
            addressId: null, // You'll need to handle address creation separately
            description: 'New user',
            postArr: []
          });
        }

        return true;
      } catch (error) {
        console.error("User creation error:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        // Add user ID from token to session
        session.user.id = token.sub || '';
        
        // Fetch additional user details from MongoDB
        await connectDb();
        const dbUser = await UserModel.findOne({ email: session.user.email });
        
        if (dbUser) {
          // Add any additional user details you want to expose in the session
          session.user.userName = dbUser.userName;
          session.user.email = dbUser.email;
                // when he will update the type to contain profile imege
          // session.user.image = dbUser.image;
        }
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// this is the changes for the vercel.
// export const GET = NextAuth(authOptions);
// export const POST = NextAuth(authOptions);
