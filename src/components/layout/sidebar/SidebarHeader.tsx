import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const SidebarHeader = () => {
  return (
    <Link
      href={"/"}
      className="relative mx-auto">
      <Image src={Logo.src} alt="logo" width={100} height={100} />
 
    </Link>
  );
};

export default SidebarHeader;
