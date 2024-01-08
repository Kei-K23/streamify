import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      This is main page
      <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" />
    </main>
  );
}
