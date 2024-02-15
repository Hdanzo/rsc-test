import Discord from "next-auth/providers/discord";
import NextAuth from "next-auth";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "~/auth.config";

const DEFAULT_USER_PERMISSION = "read";

export type Permission = "read" | "create" | "update";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    ...authConfig,
    async jwt({ token }) {
      const permissions = await prisma.userPermission.findMany({
        where: { userId: token.sub },
        include: { permission: true },
      });

      const permissionNames = permissions.map(
        (userPermission) => userPermission.permission.name as Permission
      );

      token.permissions = permissionNames;

      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      session.user.permissions = token.permissions;

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      try {
        if (!user.id) throw new Error("No user id found.");

        const readPermission = await prisma.permission.findFirstOrThrow({
          where: { name: DEFAULT_USER_PERMISSION },
        });

        await prisma.userPermission.create({
          data: {
            userId: user.id,
            permissionId: readPermission.id,
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error(
          `Something went wrong when creating the user permission, make sure you have the ${DEFAULT_USER_PERMISSION} permission`
        );
      }
    },
  },
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
});
