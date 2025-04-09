"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Key } from "react";
import { Calendar,MessageCircle,Info } from 'lucide-react';

const navigations = [
  { title: "Calendar", icon: <Calendar />, path: "/patient/calendar" },
  { title: "Chat", icon: <MessageCircle />, path: "/patient/chat" },
  { title: "Profile", icon: <Info />, path: "/patient/info" },
];

export default function SidebarBody() {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col items-center space-y-5">
      {navigations.map((navItem, key: Key) => {
        const isActive =
          navItem.path === "/"
            ? pathname === "/"
            : pathname.startsWith(navItem.path);
        return (
          <Link
            href={navItem.path}
            key={key}
            className="size-12">
            <Button
              variant={"link"}
              tooltip={navItem.title}
              tooltipOptions={{
                side: "right",
              }}
              className={`aspect-square size-12 flex-col items-center justify-center hover:no-underline ${isActive ? "bg-[#FCE5F2] text-[#e5007a]" : "text-gray-700"}`}>
              {navItem.icon}
              {/* <H2
                className={`text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {navItem.title}
              </H2> */}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
