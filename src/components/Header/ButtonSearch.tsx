import Image from "next/image";
import Link from "next/link";
export function ButtonSearch(){

    return(
      <div>
  <Link 
    href="./catalog" 
    className="bg-[var(--color-primary)] hover:shadow-[var(--shadow-button-default)] active:shadow-[var(--shadow-button-active)] hidden md:flex w-10 lg:w-40 cursor-pointer duration-300"
  >
    <Image 
      src="/icons/Button.svg" 
      alt="Button-logo" 
      width={160} 
      height={30} 
      sizes="(max-width: 768px) 100vw, 50vw" 
      className="hidden md:block" 
      style={{ width: 'auto', height: 'auto' }}
    />
  </Link>
</div>

    )
}