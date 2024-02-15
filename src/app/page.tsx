import Link from "next/link";

import { auth } from "~/auth";

import { hasPermissions } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="text-center">
      {session && hasPermissions(session.user.permissions, ["read"]) ? (
        <ul className="inline-block text-left">
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
      ) : (
        <div>It seems you don&apos;t have read permissions :(</div>
      )}
    </main>
  );
}
