"use client";

import React from "react";
import { Search, Bell, AudioLines, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const HeaderLayout = () => {
  const router = useRouter();

  const handleMeasurement = () => {
    router.push("/patient/calendar/blood-pressure");
  };

  return (
    <div className="border-b-2 border-[#e5007a] h-14  backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-6">
          <div
            className="text-xl font-bold text-[#e5007a] italic cursor-pointer"
            onClick={() => router.push("/")}
          >
            M-Guard
          </div>

          <Button
            variant="fullfilled"
            size="sm"
            className=" text-white flex items-center gap-2 px-3 py-1"
            onClick={handleMeasurement}
          >
            <Activity className="h-4 w-4" />
            Đo Huyết Áp
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-10 pr-10 bg-white/60 backdrop-blur-sm border-0 focus-visible:ring-0"
            />
            {/* <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer hover:text-[#e5007a] transition-colors" /> */}
          </div>

          <Button
            variant="text"
            size="sm"
            className="relative hover:bg-white/60"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              2
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="text" size="sm" className="hover:bg-white/60">
                <AudioLines className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                Thông tin cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Cài đặt
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600">
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
