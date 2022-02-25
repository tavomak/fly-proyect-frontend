import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jwt-decode';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const res = await fetch(`${process.env.API_URL}/auth`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const token = await res.json();

        const auth = token.token;

        if (res.ok && token) {
          const USER_DATA = jwt(token.token);
          const { user } = USER_DATA;
          return { ...user, token: auth };
        }

        return null;
      },
    }),
  ],
  secret: process.env.SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  events: {},
  theme: {
    colorScheme: 'light',
  },
  debug: false,
});
