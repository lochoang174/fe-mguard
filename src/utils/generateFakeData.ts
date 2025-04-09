import { BloodPressureRecord, BloodPressureStatus } from "../types/calendar";

const getBloodPressureStatus = (
  systolic: number,
  diastolic: number,
  heartRate: number
): BloodPressureStatus => {
  if (systolic > 140 || diastolic > 90 || heartRate > 100) {
    return "danger";
  } else if (systolic > 130 || diastolic > 80 || heartRate > 90) {
    return "warning";
  }
  return "normal";
};

const getNote = (status: BloodPressureStatus): string | undefined => {
  switch (status) {
    case "danger":
      return "Vui lòng theo dõi và tham khảo ý kiến bác sĩ";
    case "warning":
      return "Nghỉ ngơi và đo lại sau 30 phút";
    default:
      return undefined;
  }
};

export const generateFakeData = (): BloodPressureRecord[] => {
  const records: BloodPressureRecord[] = [];
  const times = ["08:00", "12:00", "16:00", "20:00"];

  // Create data with different cases
  times.forEach((time, index) => {
    let systolic, diastolic, heartRate;

    // Create different cases for each measurement
    switch (index) {
      case 0: // Normal case
        systolic = Math.floor(Math.random() * 10) + 110; // 110-120
        diastolic = Math.floor(Math.random() * 10) + 65; // 65-75
        heartRate = Math.floor(Math.random() * 10) + 65; // 65-75
        break;
      case 1: // Warning case
        systolic = Math.floor(Math.random() * 10) + 130; // 130-140
        diastolic = Math.floor(Math.random() * 10) + 80; // 80-90
        heartRate = Math.floor(Math.random() * 10) + 90; // 90-100
        break;
      case 2: // Danger case
        systolic = Math.floor(Math.random() * 20) + 140; // 140-160
        diastolic = Math.floor(Math.random() * 15) + 90; // 90-105
        heartRate = Math.floor(Math.random() * 20) + 100; // 100-120
        break;
      default: // Normal case
        systolic = Math.floor(Math.random() * 10) + 115; // 115-125
        diastolic = Math.floor(Math.random() * 10) + 70; // 70-80
        heartRate = Math.floor(Math.random() * 10) + 70; // 70-80
    }

    const status = getBloodPressureStatus(systolic, diastolic, heartRate);
    const note = getNote(status);

    records.push({
      id: index + 1,
      time,
      systolic,
      diastolic,
      heartRate,
      status,
      note,
    });
  });

  return records;
};
