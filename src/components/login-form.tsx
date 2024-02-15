import { DiscordLogoIcon } from "@radix-ui/react-icons";

import { signIn } from "~/auth";

import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
      <DiscordButton />
    </div>
  );
}

function DiscordButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
    >
      <Button
        className="w-full"
        variant="secondary"
      >
        <DiscordLogoIcon className="h-5 w-5 mr-4 text-gray-50" /> Discord
      </Button>
    </form>
  );
}
