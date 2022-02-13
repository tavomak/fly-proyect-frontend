import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jwt-decode';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:4000/api/auth", {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          }),
          headers: { "Content-Type": "application/json" }
        })
        const token = await res.json()
        if (res.ok && token) {
          const USER_DATA = jwt(token.token);
          const {user} = USER_DATA;
          console.log('user: ', user)
          return user;
        }

        return null
      }
    }),
  ],
  secret: process.env.SECRET,

  session: {
    strategy: "jwt",
  },
  jwt: {},
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user)
      return token
    },
    session: async ({ session, token }) => {
        session.user = token.user
        return session
    }
  },
  events: {},
  theme: {
    colorScheme: "light",
  },
  debug: false,
})
