export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  resourceId: string;
  status: "normal" | "warning" | "danger" | "possible_error";
  note: string;
}

export interface SlotInfo {
  start: Date;
  end: Date;
  slots: Date[];
}

export type BloodPressureStatus = "normal" | "warning" | "danger";

export interface BloodPressureRecord {
  _id: string;
  diastolic: number;
  systolic: number;
  heartRate: number;
  status: "normal" | "warning" | "danger" | "possible_error";
  note: string;
  createdAt: string;
  updatedAt: string;
}
