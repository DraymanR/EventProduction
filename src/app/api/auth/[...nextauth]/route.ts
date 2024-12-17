import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import connectDb from '../../../lib/db/connectDb'
import { UserModel } from '../../../lib/models/user'
import { Title , Language} from "../../../types/user"
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
          // Redirect to a custom page or return false to prevent sign-in
          return '/auth/new_user_error'; // This will redirect to a custom page
        }

        return true;
      } catch (error) {
        console.error("User validation error:", error);
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
        }
      }
      return session;
    }
  },
  pages: {
    // Redirect to this page for new users trying to sign in with Google
    newUser: '/auth/new_user_error'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }