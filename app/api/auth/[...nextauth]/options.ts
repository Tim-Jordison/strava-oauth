import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import StravaProvider from 'next-auth/providers/strava'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    // session: {
    //     strategy: "jwt"
    // },
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        StravaProvider({
            clientId: process.env.STRAVA_ID as string,
            clientSecret: process.env.STRAVA_SECRET as string,
            authorization: {
                params: {
                    scope: "activity:read_all,activity:write" //https://developers.strava.com/docs/oauth-updates/
                }
            }
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: {
        //             label: "Username: ",
        //             type: "text",
        //             placeholder: "Your username"
        //         },
        //         password: {
        //             label: "Password:",
        //             type: "password",
        //             placeholder: "Your unique password"
        //         }
        //     },
        //     async authorize(credentials){
        //         // This is where you need to retrieve user data
        //         // to verify with credentials
        //         // Docs: https://next-auth.js/org/configuration/providers/credentials
        //         const user = {id: "42", name: "Tim", password: "nextauth"}
        //         if (credentials?.username === user.name && credentials?.password === user.password) {
        //             return user
        //         } else {
        //             return null
        //         }
        //     },
        // })
    ],
    callbacks: {
        async jwt({ token, account }) {
            console.log('token ', token)
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        // async session({ session, token }) {
        //     session.user = token;
        //     session.accessToken = token.accessToken;
        //     return session;
        // },
    }
}