"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/patient/calendar");
  }, [router]);

  return <div />;
};

export default Page;
