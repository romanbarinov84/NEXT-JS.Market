import Image from "next/image";



export function InputBlock() {
  return (
    <div className="relative flex  min-w-[361px] flex-grow" >
      <input
        type="text"
        placeholder="пошук товару"
        className="w-full  max-w-md p-2 h-10 rounded py-2 px-4 outline outline-(--color-primary) border-none focus:shadow-(--shadow-button-default) hidden md:block text-[#8f8f8f] text-base leading-[150%]"
      />
      <button className="absolute  right-0 cursor-pointer ">
        <Image
          src="/icons/free-icon-loupe-9970873.png"
          alt="Search-button"
          width={40}
          height={40} 
          
        />
      </button>
    </div>
  );
}
