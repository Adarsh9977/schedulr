import { prisma } from "@/lib/prisma";
import { Session, SessionStrategy } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { SignJWT } from 'jose';
import GitHubProvider from "next-auth/providers/github";

export interface session extends Session{
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  token?: string;
}

interface token extends JWT{
  id: string;
  name: string;
  email: string;
  image: string;
  accessToken?: string;
  iat?: number;
  exp?: number;
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email repo'
        }
      }
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials : any) {
    //     const user = await prisma.user.findFirst({
    //       where: {
    //         email: credentials.email,
    //       },
    //     });
    //     if (!user || !user.email || !user.password) {
    //       return null;
    //     }
    //     const validPassword = await bcrypt.compare(
    //       credentials.password,
    //       user.password
    //     );

    //     if (!validPassword) {
    //       return null;
    //     }
    //     return {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //       image: user.image,
    //     };
    //   },
    // }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account } : { token: any, user?: any, account?: any }) {
        const newToken: token = token as token;
        if (user) {
            // Add standard JWT claims
            const iat = Math.floor(Date.now() / 1000);
            const exp = iat + (30 * 24 * 60 * 60); // 30 days expiry

            newToken.id = user.id;
            newToken.name = user.name;
            newToken.email = user.email;
            newToken.image = user.image;
            newToken.iat = iat;
            newToken.exp = exp;

            // Store GitHub access token if available
            if (account && account.provider === 'github') {
                newToken.accessToken = account.access_token;
                // Update or create account record with GitHub token
                await prisma.account.upsert({
                    where: {
                        provider_providerAccountId: {
                            provider: 'github',
                            providerAccountId: account.providerAccountId
                        }
                    },
                    create: {
                        userId: user.id,
                        type: account.type,
                        provider: 'github',
                        providerAccountId: account.providerAccountId,
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        token_type: account.token_type,
                        scope: account.scope,
                        refresh_token: account.refresh_token,
                    },
                    update: {
                        access_token: account.access_token,
                        expires_at: account.expires_at,
                        token_type: account.token_type,
                        scope: account.scope,
                        refresh_token: account.refresh_token,
                    }
                });
                console.log('GitHub account updated in database', account);
                // Update user with GitHub information
                const res = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                      githubAdded: true,
                      githubId: account.providerAccountId.toString(),
                    }
                });
                console.log('User updated in database', res);
            } else {
                // Create a proper JWT token with user details for non-GitHub login
                const jwtToken = await new SignJWT({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt(iat)
                .setExpirationTime(exp)
                .setNotBefore(iat)
                .sign(new TextEncoder().encode(process.env.NEXTAUTH_SECRET));

                newToken.accessToken = jwtToken;
            }
        }
        return newToken;
    },
    async session({ session, token }: { session: any, token: any }) {
        const newSession: session = session as session;
        if(!newSession.user) {
            session.user = {
                name: token.name,
                email: token.email,
                image: token.image ?? null,
                id: token.id,
            };
        }else{
            newSession.user.id = token.id;
            newSession.user.name = token.name;
            newSession.user.email = token.email;
            newSession.user.image = token.image;
        }
        
        // Include the JWT token in the session
        newSession.token = token.accessToken;

        return newSession;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  }
};
