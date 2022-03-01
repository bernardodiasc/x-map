import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    session: async ({ session, user, token }) => {
      if (user) {
        session.jwt = user.jwt
        session.id = user.id
      }
      return session
    },
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      const isSignIn = user ? true : false
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${account.provider}/callback?access_token=${account?.accessToken}`
        )
        const { data } = await response.json()
        if (data) {
          token.jwt = data.jwt
          token.id = data.user.id
          token.name = user.user.username
          token.email = user.user.email
        }
      }
      return token
    },
  },
})
