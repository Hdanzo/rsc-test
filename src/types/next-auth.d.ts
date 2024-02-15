import type { Permission } from "@/lib/auth";

import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      permissions: Permission[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    permissions: Permission[];
  }
}
