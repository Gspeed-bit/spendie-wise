"use client";
import { sideBar } from "@/constant";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi"; // Assuming FiLogOut is the correct icon for logout
const Sidebar = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="h-screen text-bluey-400">
      <div className="flex flex-col pt-20">

       <div className="mx-14"> <Image src={"/logo.png"} alt={"logo"} width={85} height={55} /></div>
        <ul>
          {sideBar.map((sidebar) => (
            <li key={sidebar.text} className="mt-4">
              <Link href={sidebar.url}>
                <span className="flex items-center mt-3 justify-start gap-3 mx-9">
                  <sidebar.icon /> {/* Assuming sidebar.icon is a component */}
                  <p>{sidebar.text}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-col  gap-4 space-y-0 md:space-y-10 mx-10 fixed bottom-12">
        <div>
          {isSignedIn ? (
            <span className="flex-around gap-3">
              {" "}
              <UserButton /> <p>profile</p>
            </span>
          ) : null}
        </div>

        <div className="flex-start ">
          <Image src={"/icons/signOut.svg"} alt="text" width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
