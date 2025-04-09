import HeaderLayout from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <HeaderLayout />
        <div className="grow overflow-y-auto no-scrollbar ">{children}</div>
      </div>
    </div>
  );
}
