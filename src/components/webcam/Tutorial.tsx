"use client";
import React, { useState, useEffect } from "react";
import { XCircle, CheckCircle } from "lucide-react";
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

interface Instruction {
  id: number;
  text: string;
  completed: boolean;
}

const instructions: Instruction[] = [
  {
    id: 1,
    text: "Wear the blood pressure cuff correctly on your upper arm",
    completed: false,
  },
  {
    id: 2,
    text: "Sit in the correct position with your back straight and feet flat on the floor",
    completed: false,
  },
  {
    id: 3,
    text: "Remain silent and still during the measurement",
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
  }, [currentInstructions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle measurement submission here
    console.log("Measurement submitted:", measurement);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
      <div className="w-full max-w-md bg-transparent rounded-xl p-6 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Blood Pressure Measurement Tutorial
          </h1>
          <p className="text-sm text-gray-500">
            Please follow the steps below to measure your blood pressure
            correctly.
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
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            Proceed to Measurement
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
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tutorial;
