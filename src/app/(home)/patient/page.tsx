"use client";
import WebcamComponent from "@/components/webcam/Webcam";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router =useRouter()
  router.push("/patient/calendar")
  return (
    <div>
    </div>
  );
};

export default Page;
