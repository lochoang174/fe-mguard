import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-be-vietnam-pro", // Biến CSS để sử dụng trong Tailwind
});
export default beVietnamPro
