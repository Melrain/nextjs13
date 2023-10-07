import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <h1 className="flex-center h1-bold">HomePage</h1>
      <h1 className="h2-bold">Next.js13! We are coming!</h1>
      <h2 className="h3-bold">Next.js13! We are coming!</h2>
    </div>
  );
}
