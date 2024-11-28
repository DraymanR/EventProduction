// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID!,
//       clientSecret: process.env.GOOGLE_SECRET!,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET, // Used to encrypt tokens

//   callbacks: {
//     // Handling the JWT to store custom information in the token
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         // Type guard to ensure profile.id or profile.sub is a valid string
//         const userId = profile.id || profile.sub;

//         if (userId) {
//           token.id = userId; // Store the ID in token if it's available
//         } else {
//           // You could throw an error here or provide a fallback value
//           // For now, we can safely assign an empty string as fallback
//           token.id = '';
//         }
//       }
//       return token;
//     },

//     // Handling the session to add custom info to the session
//     async session({ session, token }) {
//       // Type guard to ensure token.id is a valid string
//       if (token?.id) {
//         session.user.id = token.id; // Add user ID to session
//       } else {
//         // Handle case when token.id is not set
//         session.user.id = ''; // Or any default fallback value
//       }
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };


