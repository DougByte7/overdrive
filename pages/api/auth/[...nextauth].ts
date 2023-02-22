import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "model/User"
import bcrypt from "bcrypt"
import dbConnect from "lib/dbConnect"

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  jwt: {
    // 30 dias
    maxAge: 60 * 60 * 24 * 30,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) return null

        await dbConnect()

        const { email, password } = credentials
        const user: {
          id: string
          name: string
          email: string
          hashedPassword: string
          image: string
        } | null = await User.findOne({ email })

        const invalidError = new Error("Invalid email or password")

        if (!user) {
          throw invalidError
        }

        const match = await bcrypt.compare(password, user.hashedPassword)
        if (!match) {
          throw invalidError
        }

        const { id, image } = user

        return { id, email, image }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
}

export default NextAuth(authOptions)
