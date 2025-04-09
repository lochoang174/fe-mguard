import React from "react";
import { Search, Bell, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HeaderLayout = () => {
  return (
    <div className="border-b-2 border-[#e5007a] h-14">
      <div className="flex items-center justify-between py-2 px-6">
        <div className="flex items-center gap-10">
          <div className="text-xl font-bold text-[#e5007a] italic">M-Guard</div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-10 pr-10 bg-white/60 backdrop-blur-sm border-0 focus-visible:ring-0"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 cursor-pointer hover:text-[#e5007a] transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="text"
            size="sm"
            className="relative hover:bg-white/60 p-2"
          >
            <Bell className="h-5 w-5" />
         
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="text"
                size="sm"
                className="hover:bg-white/10 p-2"
              >
                <AudioLines className="h-5 w-5" />{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Thông tin cá nhân</DropdownMenuItem>
              <DropdownMenuItem>Cài đặt</DropdownMenuItem>
              <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default HeaderLayout;
