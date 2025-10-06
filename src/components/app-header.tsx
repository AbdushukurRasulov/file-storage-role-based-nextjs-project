import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import React from "react";

const AppHeader = () => {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container flex items-center justify-between mx-auto">
        <div className="font-bold text-xl">FileDrive</div>
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignUpButton>
              <button className="bg-[#6c47ff] text-white text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
            <SignInButton />
          </SignedOut>
          {/* <SignIn /> */}
          <SignedIn>
            <OrganizationSwitcher />
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
