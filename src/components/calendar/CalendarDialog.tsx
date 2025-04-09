import React from "react";
import { BloodPressureRecord } from "../../types/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { BloodPressureTable } from "./BloodPressureTable";
import { Button } from "../ui/button";
import { MessageSquare, Activity } from "lucide-react";
import { useRouter } from "next/navigation";

interface CalendarDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  bloodPressureData: BloodPressureRecord[];
}

export const CalendarDialog = ({
  isOpen,
  onOpenChange,
  selectedDate,
  bloodPressureData,
}: CalendarDialogProps) => {
  const router = useRouter();
  const handleAIConsultation = () => {
    // TODO: Implement AI consultation
    router.push("/patient/chat?type=consultation");
  };

  const handleMeasureBloodPressure = () => {
    // TODO: Implement blood pressure measurement
    router.push("/patient/calendar/blood-pressure");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] w-[1200px] max-w-[95vw] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedDate?.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-x-auto">
          <BloodPressureTable data={bloodPressureData} />
        </div>
        <DialogFooter className="flex gap-4 mt-6">
          <Button
            variant="outlined"
            className="flex items-center gap-2"
            onClick={handleAIConsultation}
          >
            <MessageSquare className="h-4 w-4" />
            AI Consultation
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={handleMeasureBloodPressure}
          >
            <Activity className="h-4 w-4" />
            Measure Blood Pressure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
