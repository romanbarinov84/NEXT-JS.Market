"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function CloseButton() {
  const router = useRouter();

  function handleClose() {
    router.replace("/");
  }
  return (
    
      <button
        onClick={handleClose}
        className="bg-[#f3f3f3] rounded duration-300 cursor-pointer mb-8 absolute 
        top-0 right-10"
        aria-label="Закрыть"
      >
        <Image src="/X_SVG.svg" width={34} height={34} alt="Закрыть" />
      </button>
    
  );
}

export default CloseButton;
