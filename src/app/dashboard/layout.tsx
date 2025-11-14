import SideNav from "@/components/side-nav";
import React from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto flex gap-8 py-5">
      <SideNav />
      <div className="w-full">{children}</div>
    </main>
  );
}
