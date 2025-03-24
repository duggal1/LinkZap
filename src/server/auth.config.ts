/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultSession, NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { user, account } from "./db/schema";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { db } from "./db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AdapterAccount } from "@auth/core/adapters";

// extend the types to include role
declare module "next-auth" {
  interface User {
    role?: "user" | "admin";
  }

  interface Session {
    user: {
      id: string;
      role?: "user" | "admin";
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "user" | "admin";
  }
}

type AccountAdapter = {
  type: "oauth" | "email" | "credentials";
  provider: string;
  providerAccountId: string;
  userId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
};

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    verifyRequest: "/verify-request",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user: authUser, account: providedAccount }) {
      try {
        if (providedAccount?.provider === "github" || providedAccount?.provider === "google") {
          if (!authUser.email) return false;

          // Define new user data with proper typing
          const newUserData: typeof user.$inferInsert = {
            id: authUser.id || crypto.randomUUID(),
            email: authUser.email,
            name: authUser.name ?? null,
            image: authUser.image ?? null,
            role: "admin", // TESTING: Force admin role
            emailVerified: new Date(),
            updatedAt: new Date(),
          };

          const [existingUser] = await db
            .select()
            .from(user)
            .where(eq(user.email, authUser.email));

          if (existingUser) {
            // Update existing user with proper typing
            const updateData: Partial<typeof user.$inferInsert> = {
              name: authUser.name ?? existingUser.name,
              image: authUser.image ?? existingUser.image,
              role: "admin", // TESTING: Force admin role
              updatedAt: new Date(),
            };

            await db
              .update(user)
              .set(updateData)
              .where(eq(user.id, existingUser.id));

            if (typeof authUser === 'object') {
              authUser.id = existingUser.id;
              authUser.role = "admin";
            }

            // Check if account needs to be linked
            const existingAccount = await db.query.account.findFirst({
              where: (accounts, { and, eq }) => 
                and(
                  eq(accounts.userId, existingUser.id),
                  eq(accounts.provider, providedAccount.provider)
                )
            });

            if (!existingAccount && providedAccount) {
              // Create properly typed account object
              const accountData: typeof account.$inferInsert = {
                userId: existingUser.id,
                type: "oauth", // Fixed type
                provider: providedAccount.provider,
                providerAccountId: providedAccount.providerAccountId,
                refresh_token: providedAccount.refresh_token ?? null,
                access_token: providedAccount.access_token ?? null,
                expires_at: providedAccount.expires_at ? 
                  Math.floor(providedAccount.expires_at) : null, // Convert to integer
                token_type: providedAccount.token_type ?? null,
                scope: providedAccount.scope ?? null,
                id_token: providedAccount.id_token ?? null,
                session_state: providedAccount.session_state?.toString() ?? null, // Convert to string
              };

              await db.insert(account).values(accountData);
            }
          } else {
            // Create new user with proper typing
            await db.insert(user).values(newUserData);

            if (typeof authUser === 'object') {
              authUser.role = "admin";
              authUser.id = newUserData.id;
            }

            // Create account link for new user with proper typing
            if (providedAccount) {
              const accountData: typeof account.$inferInsert = {
                userId: newUserData.id,
                type: "oauth", // Fixed type
                provider: providedAccount.provider,
                providerAccountId: providedAccount.providerAccountId,
                refresh_token: providedAccount.refresh_token ?? null,
                access_token: providedAccount.access_token ?? null,
                expires_at: providedAccount.expires_at ? 
                  Math.floor(providedAccount.expires_at) : null, // Convert to integer
                token_type: providedAccount.token_type ?? null,
                scope: providedAccount.scope ?? null,
                id_token: providedAccount.id_token ?? null,
                session_state: providedAccount.session_state?.toString() ?? null, // Convert to string
              };

              await db.insert(account).values(accountData);
            }
          }
          return true;
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    // Force admin role in JWT and session
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      
      if (user) {
        token.role = "admin"; // TESTING: Force admin role
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.email = token.email as string;
      }
      return session;
    },

    // TESTING: Allow all authenticated users to access admin
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin) {
        return isLoggedIn; // TESTING: Only check if logged in, ignore role
      } else if (isOnDashboard) {
        return isLoggedIn;
      }
      return true;
    },
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'user', // Will be updated in signIn callback
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'user',
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@exmple.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const [foundUser] = await db
          .select()
          .from(user)
          .where(eq(user.email, email.toLowerCase()));

        if (!foundUser) return null;

        //check if password is correct
        const passwordsMatch = await bcrypt.compare(
          password,
          foundUser.password || ""
        );

        if (!passwordsMatch) return null;

        return {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          image: foundUser.image,
          role: foundUser.role,
        };
      },
    }),
  ],

  adapter: DrizzleAdapter(db),
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
