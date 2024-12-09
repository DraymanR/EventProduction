// import NextAuth, { AuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error('Missing Google OAuth credentials')
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub || ''
//       }
//       return session
//     }
//   }
// }

// const handler = NextAuth(authOptions)

// export { handler as GET, handler as POST }