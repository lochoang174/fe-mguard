"use client";
import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/api/axios";
import { useRouter } from "next/navigation";

interface Instruction {
  id: number;
  text: string;
  completed: boolean;
}

const instructions: Instruction[] = [
  {
    id: 1,
    text: "Đeo vòng bít huyết áp đúng cách vào cánh tay trên",
    completed: false,
  },
  {
    id: 2,
    text: "Ngồi đúng tư thế với lưng thẳng và bàn chân đặt phẳng trên sàn",
    completed: false,
  },
  {
    id: 3,
    text: "Giữ im lặng và không cử động trong quá trình đo",
    completed: false,
  },
];

const Tutorial = () => {
  const [currentInstructions, setCurrentInstructions] =
    useState<Instruction[]>(instructions);
  const [allCompleted, setAllCompleted] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [measurement, setMeasurement] = useState({
    systolic: "",
    diastolic: "",
    heartRate: "",
  });
  const router = useRouter();
  useEffect(() => {
    const timers = currentInstructions.map((_, index) => {
      return setTimeout(() => {
        setCurrentInstructions((prev) => {
          const newInstructions = [...prev];
          newInstructions[index] = {
            ...newInstructions[index],
            completed: true,
          };
          return newInstructions;
        });
        // toast.success(`Đã hoàn thành bước ${index + 1}!`, {
        //   position: "top-right",
        //   autoClose: 2000,
        // });
      }, 3000 * (index + 1));
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const completed = currentInstructions.every(
      (instruction) => instruction.completed
    );
    setAllCompleted(completed);
    if (completed) {
      toast.success("Đã hoàn thành tất cả các bước!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [currentInstructions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post("/heart-press", {
        systolic: Number(measurement.systolic),
        diastolic: Number(measurement.diastolic),
        heartRate: Number(measurement.heartRate),
      });

      if (response.status === 201) {
        toast.success("Đã gửi kết quả đo thành công!", {
          position: "top-right",
          autoClose: 3000,
        });

        setIsDialogOpen(false);
        router.push("/patient/chat?type=consultation");
      }
      //@ts-ignore
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi kết quả!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <div className="w-full max-w-md bg-transparent rounded-xl p-6 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Hướng dẫn đo huyết áp
          </h1>
          <p className="text-sm text-gray-500">
            Xin hãy làm theo chỉ dẫn của AI
          </p>
        </div>

        <div className="space-y-3">
          {currentInstructions.map((instruction) => (
            <div
              key={instruction.id}
              className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                instruction.completed
                  ? "bg-green-50/80 text-green-600"
                  : "bg-red-50/80 text-red-600"
              }`}
            >
              {instruction.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{instruction.text}</p>
            </div>
          ))}
        </div>

        {allCompleted && (
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-full   text-white"
          >
            Nhập kết quả đo
          </Button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Measurement Results</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="systolic">Systolic Pressure (mmHg)</Label>
              <Input
                id="systolic"
                name="systolic"
                type="number"
                value={measurement.systolic}
                onChange={handleInputChange}
                placeholder="e.g., 120"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="diastolic">Diastolic Pressure (mmHg)</Label>
              <Input
                id="diastolic"
                name="diastolic"
                type="number"
                value={measurement.diastolic}
                onChange={handleInputChange}
                placeholder="e.g., 80"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                name="heartRate"
                type="number"
                value={measurement.heartRate}
                onChange={handleInputChange}
                placeholder="e.g., 75"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outlined" onClick={() => setIsDialogOpen(false)}>
              Hủy bỏ
            </Button>
            <Button onClick={handleSubmit}>Gửi kết quả</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tutorial;
