import { groq } from 'next-sanity'
import { readClient } from '@/sanity/lib/client'
import { createUser } from '@/sanity/actions/user.actions'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await readClient.fetch(groq`*[_type == "user" && email == $email][0]`, { email: session.user.email })

      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ account, profile, user }) {
      
      createUser(user)

      return true
    }
  }
}
