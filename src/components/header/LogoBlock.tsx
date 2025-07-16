import Link from "next/link";
import Image from "next/image";

export default function LogoBlock() {
  return (
    <div>
      <Link
        href="/"
        className="flex flex-row gap-3 items-center cursor-pointer"
      >
        <div className="relative w-20 h-20 md:w-15 md:h-15 xl:w-30 xl:h-20">
          <Image 
          src="/logo/logo-1.png" 
          alt="Header-logo" 
          fill 
          sizes="68px" 
          priority/>
          
        </div>
        <div className="relative hidden md:block w-30 h-3">
            <h3>Балувана Галя</h3>
            </div>
      </Link>
    </div>
  );
}
