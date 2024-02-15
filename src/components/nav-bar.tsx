import { signOut } from "~/auth";

import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <header>
      <nav className="min-h-10 bg-gray-800 py-2 px-24 max-w-full flex justify-end">
        <div className="max-w-5xl">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button>Sign out</Button>
          </form>
        </div>
      </nav>
    </header>
  );
}
