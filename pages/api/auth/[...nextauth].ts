import NextAuth, { Session, User} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { JWT } from 'next-auth/jwt'
import DBClient from "../../../globalPrisma";

const prisma = DBClient.getInstance().prisma

type SessionArg = {
    session: Session
    user : User
    token: JWT
}

export type UserSession = {
    userId: string
} & Session

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({session, user}: SessionArg) => {
            session.userId = user.id
            return Promise.resolve(session as UserSession)
        }
    }
})