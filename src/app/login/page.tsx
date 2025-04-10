"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const Login = () => {
  const handleGoogleLogin = async () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
      window.location.href = `${url}/auth/google`;
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/20 backdrop-blur-sm rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-40 h-40">
            <Image
              src={logo.src}
              alt="M-Guard Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="text-center space-y-3">
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Chào mừng đến với M-Guard
            </h1>
            <div className="space-y-2">
              <p className="text-gray-600 font-medium">
                Người bạn đồng hành tin cậy trong hành trình hậu sản
              </p>
              {/* <p className="text-sm text-gray-500">
                Theo dõi huyết áp thông minh - Bảo vệ sức khỏe mẹ bầu
              </p> */}
            </div>
          </div>
        </div>

        <Button
          onClick={handleGoogleLogin}
          className="w-full py-3 text-base font-medium"
          variant="outlined"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.613 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.869 0 .307 5.387.307 12s5.562 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          <span>Đăng nhập với Google</span>
        </Button>

        <div className="text-center text-sm text-gray-500">
          <p>Bằng cách đăng nhập, bạn đồng ý với</p>
          <p className="mt-1">
            <a href="#" className="text-pink-600 hover:text-pink-700">
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700">
              Chính sách bảo mật
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
