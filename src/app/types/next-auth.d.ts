import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image: string
<<<<<<< HEAD
      userName?: string
      title?: string[]
=======
>>>>>>> f57a4674fdfec51c87d67cf7791498c7716efcaf
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}