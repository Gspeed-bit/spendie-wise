"use client";
import Image from "next/image";
import { Button } from "../button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className=" w-full shadow-md bg-primary-300 sticky top-0 z-50">
      <div className=" wrapper  flex-between   p-3 ">
        <Link href={"/"}>
          <Image src="/logo.png" width={60} height={50} alt="Logo" />
        </Link>

        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <Link href={"/sign-in"}>
            <Button className="rounded-xl" size="lg">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
