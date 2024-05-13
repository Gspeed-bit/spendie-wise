"use client";
import { sideBar } from "@/constant";
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, BellRing, LogOut } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { user, isSignedIn } = useUser();
  const [progress, setProgress] = useState(80);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <Link href="#">
        <Image src={"/logo.png"} alt={"logo"} width={85} height={55} />
      </Link>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <label className="px-3 text-xs font-semibold uppercase text-gray-900">
            analytics
          </label>
          <ul>
            {sideBar.map((sidebar) => (
              <Link href={sidebar.url}>
                <li key={sidebar.text} className="mt-4">
                  <span
                    className={`flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-primary-400 hover:text-white ${
                      path == sidebar.url &&
                      "bg-primary-400 hover:text-white"
                    }`}
                  >
                    <sidebar.icon className="h-5 w-5" />
                    {/* Assuming sidebar.icon is a component */}
                    <p className="mx-2 text-sm font-medium">{sidebar.text}</p>
                  </span>
                </li>
              </Link>
            ))}
          </ul>

          <div className="space-y-3 ">
            <label className="px-3 text-xs font-semibold uppercase text-gray-900">
              content
            </label>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-primary-400 hover:text-white"
              href="#"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Blogs</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-primary-400 hover:text-white"
              href="#"
            >
              <BellRing className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Notifications</span>
            </Link>
          </div>
        </nav>
        <div className="mt-6">
          <div className="rounded-lg bg-gray-100 p-3 ">
            <h2 className="text-sm font-medium text-gray-800">
              New feature coming soon!
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Set goals, budget, avoid impulse buys. Use rewards, shop smart,
              automate savings. Cut expenses, invest wisely. Requires
              discipline.
            </p>
            <Image
              className="mt-2 rounded-lg object-cover"
              src="/newFeature.png"
              alt="Feature"
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            {isSignedIn ? (
              <span className="flex items-center gap-x-3">
                <UserButton />
                <span className="text-sm font-medium text-gray-700">
                  {user.fullName}
                </span>
                <SignOutButton>
                  <Link
                    href={"/"}
                    className="border bg-primary p-2 rounded-full"
                  >
                    <LogOut className="  h-4 w-4  text-white " />
                  </Link>
                </SignOutButton>
              </span>
            ) : (
              <Progress value={progress} />
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
