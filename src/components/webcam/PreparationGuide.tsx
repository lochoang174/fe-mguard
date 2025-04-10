"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const PreparationGuide = () => {
  const guidelines = [
    "Ngồi nghỉ 5 phút trước khi tiến hành đo huyết áp",
    "Không buồn tiểu khi đo huyết áp",
    "Trong vòng 30 phút trước khi đo không dùng cà phê, rượu bia, thuốc lá",
    "Không bắt chéo chân",
    "Không nói chuyện trong lúc đo",
    "Ghi kết quả huyết áp ngay sau khi đo",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outlined" className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          Xem hướng dẫn chuẩn bị
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Lưu ý trước khi đo huyết áp
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <ul className="space-y-3 text-sm text-gray-600">
            {guidelines.map((guideline, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-500">•</span>
                {guideline}
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreparationGuide;
