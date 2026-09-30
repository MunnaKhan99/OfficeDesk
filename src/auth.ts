import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const email = credentials.email as string;
                const password = credentials.password as string;

                const employee = await prisma.employee.findUnique({
                    where: { emailAddress: email },
                });

                if (!employee) return null;

                const isValid = await bcrypt.compare(password, employee.passwordHash);
                if (!isValid) return null;

                return {
                    id: String(employee.id),
                    name: employee.name,
                    email: employee.emailAddress,
                    role: employee.role,
                };
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token
        },
        session: async ({ session, token }) => {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            return session;
        },
    },
});
