import Image from "next/image";
import { Button } from "../button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex-between sticky top-0 bg-primary-300 p-3 w-full shadow-md">
      <Image src="/logo.png" width={60} height={50} alt="Logo" />
      <SignedIn>
        <Button>Get Started</Button>
      </SignedIn>

      <div className="flex gap-3 ">
        <SignedIn>
          <UserButton afterSignOutUrl="/" /> 
          {/* UserButton with sign-out URL */}
        </SignedIn>
        {/* Display custom Button component when signed out */}
        <SignedOut>
          <Button asChild className="rounded-full" size="lg">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
};
export default Header;
