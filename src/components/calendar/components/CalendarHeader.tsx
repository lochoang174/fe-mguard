import React from "react";
import moment from "moment";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT") => void;
}

const CalendarHeader = ({ date, onNavigate }: CalendarHeaderProps) => {
  return (
    <div className="flex justify-between items-center py-4 px-4">
      <button
        onClick={() => onNavigate("PREV")}
        className="p-2.5 bg-pink-50 rounded-full transition-all duration-200 
          border  border-pink-200
          active:scale-95 group"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-[#e5007a]" />
      </button>

      <h2 className="text-xl font-semibold text-gray-800">
        {moment(date).format("MMMM YYYY")}
      </h2>

      <button
        onClick={() => onNavigate("NEXT")}
        className="p-2.5 bg-pink-50 rounded-full transition-all duration-200 
          border  border-pink-200
          active:scale-95 group"
      >
        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-[#e5007a]" />
      </button>
    </div>
  );
};

export default CalendarHeader;
