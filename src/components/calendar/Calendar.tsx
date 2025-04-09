"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Calendar,
  momentLocalizer,
  View,
  Components,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../styles/calendar.css"; // Import custom CSS
import moment from "moment";
import {
  CalendarEvent,
  SlotInfo,
  BloodPressureRecord,
} from "../../types/calendar";
import { CalendarDialog } from "./CalendarDialog";
import CalendarHeader from "./components/CalendarHeader";
import axiosInstance from "@/api/axios";

// Dynamic import for BigCalendar with SSR disabled
const BigCalendar = dynamic(
  () =>
    import("react-big-calendar").then((mod) => mod.Calendar) as Promise<
      typeof Calendar
    >,
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
  }
);

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [bloodPressureData, setBloodPressureData] = React.useState<
    BloodPressureRecord[]
  >([]);
  const [events, setEvents] = React.useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [view, setView] = React.useState<View>("month");

  useEffect(() => {
    const fetchBloodPressureData = async () => {
      const response = await axiosInstance.get("/heart-press");
      if (response.status === 200) {
        const apiData = response.data as BloodPressureRecord[];
        setBloodPressureData(apiData);

        // Convert blood pressure records to calendar events
        const calendarEvents = apiData.map((record) => {
          const startTime = new Date(record.createdAt);
          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + 30); // Each measurement takes 30 minutes

          return {
            title: `BP: ${record.systolic}/${record.diastolic} mmHg, HR: ${record.heartRate} bpm`,
            start: startTime,
            end: endTime,
            resourceId: record._id,
            status: record.status,
            note: record.note,
          };
        });

        setEvents(calendarEvents);
      }
    };
    fetchBloodPressureData();
  }, []);

  const handleEventClick = (event: object) => {
    const calendarEvent = event as CalendarEvent;
    console.log("Event clicked:", calendarEvent);
    alert(`Event clicked: ${calendarEvent.title}`);
  };

  const handleDateSelect = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsDialogOpen(true);
  };

  const getBloodPressureDataForDate = (date: Date | null) => {
    if (!date) return [];

    return bloodPressureData.filter((record) => {
      const recordDate = new Date(record.createdAt);
      return (
        recordDate.getDate() === date.getDate() &&
        recordDate.getMonth() === date.getMonth() &&
        recordDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handleNavigate = (action: "PREV" | "NEXT") => {
    const newDate = new Date(currentDate);
    if (action === "PREV") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Custom components config
  const components: Components = {
    toolbar: () => null, // Hide default toolbar
  };

  return (
    <div className="calendar-container">
      <CalendarHeader date={currentDate} onNavigate={handleNavigate} />
      <BigCalendar
        localizer={localizer}
        events={events}
        view={view}
        onView={setView}
        defaultView="month"
        selectable
        popup
        components={components}
        style={{ height: "100%", backgroundColor: "transparent" }}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleDateSelect}
        date={currentDate}
        onNavigate={setCurrentDate}
        eventPropGetter={(event) => {
          const status = (event as CalendarEvent).status;
          const style = {
            backgroundColor: "#dcfce7",
            color: "#166534",
            border: "none",
          };

          if (status === "danger") {
            style.backgroundColor = "#fee2e2";
            style.color = "#991b1b";
          } else if (status === "warning") {
            style.backgroundColor = "#fef3c7";
            style.color = "#92400e";
          } else if (status === "possible_error") {
            style.backgroundColor = "#e0e7ff";
            style.color = "#1e40af";
          }

          return {
            style,
            "data-status": status || "normal",
          };
        }}
      />

      <CalendarDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        bloodPressureData={getBloodPressureDataForDate(selectedDate)}
      />
    </div>
  );
};

export default CalendarView;
