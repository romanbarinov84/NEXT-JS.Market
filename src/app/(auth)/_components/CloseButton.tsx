"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function CloseButton() {
  const router = useRouter();

  function handleClose() {
    router.replace("/");
  }
  return (
    <div>
      <button
        onClick={handleClose}
        className="bg-[#f3f2f1] rounded duration-300 cursor-pointer mb-8 absolute top-0 right-0"
        aria-label="Закрыть"
      >
        <Image src="/X_SVG.svg" width={24} height={24} alt="Закрыть" />
      </button>
    </div>
  );
}

export default CloseButton;
