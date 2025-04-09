"use client";
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:3001/api/auth/google";
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl">
        <div className="flex justify-center mb-6">
          <Image
            src={logo.src}
            alt="logo"
            height={100}
            width={100}
            className="rounded-full shadow-md"
          />
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Secure access to your account with Google authentication
        </p>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 
            bg-blue-500 text-white 
            rounded-lg 
            hover:bg-blue-600 
            transition-colors 
            font-semibold 
            flex items-center justify-center 
            space-x-3 
            shadow-md 
            hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.613 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.869 0 .307 5.387.307 12s5.562 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
