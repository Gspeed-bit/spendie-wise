"use client";

import { sideBar } from "@/constant";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className=" min-h-screen text-bluey-400">
      <div className=" m-2 flex flex-col pt-10 ">
        {sideBar.map((sidebars) => (
          <div key={sidebars.text} className="">
            <Link href={sidebars.url}>
              <div className=" px-2 py-4 max-w-48 flex gap-4">
                <div>
                  <Image
                    src={sidebars.image}
                    alt={sidebars.text}
                    width={35}
                    height={40}
                    className=""
                  />
                </div>
                <p className=" p-medium-18 capitalize ">{sidebars.text} </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
