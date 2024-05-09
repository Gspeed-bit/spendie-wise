import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../button";

export const DashboardHeader = () => {
    const { user, isSignedIn } = useUser();
  return (
    <div className="p-4 sticky top-0 bg-white flex-between shadow-sm">
      <h1>search bar</h1>
      <div>
        {isSignedIn ? (
          <span className="flex items-center gap-x-3">
            <UserButton />
            <span className="text-sm font-medium text-gray-700">
              {user.fullName}
            </span>
          </span>
        ) : (
          null
        )}
      </div>
    </div>
  );
};
