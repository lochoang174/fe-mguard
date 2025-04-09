import { BloodPressureRecord } from "../../types/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

interface BloodPressureTableProps {
  data: BloodPressureRecord[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return "bg-green-100 text-green-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "danger":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const BloodPressureTable = ({ data }: BloodPressureTableProps) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Time</TableHead>
            <TableHead className="w-[200px]">Systolic</TableHead>
            <TableHead className="w-[200px]">Diastolic</TableHead>
            <TableHead className="w-[200px]">Heart Rate</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.time}</TableCell>
              <TableCell
                className={
                  record.systolic > 130 ? "text-red-500" : "text-green-500"
                }
              >
                {record.systolic} mmHg
              </TableCell>
              <TableCell
                className={
                  record.diastolic > 80 ? "text-red-500" : "text-green-500"
                }
              >
                {record.diastolic} mmHg
              </TableCell>
              <TableCell
                className={
                  record.heartRate > 100 ? "text-red-500" : "text-green-500"
                }
              >
                {record.heartRate} bpm
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(record.status)}>
                  {record.status === "normal"
                    ? "Normal"
                    : record.status === "warning"
                    ? "Warning"
                    : "Danger"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
