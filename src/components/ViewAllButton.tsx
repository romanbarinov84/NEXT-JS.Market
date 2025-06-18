import Image from "next/image";


export default function ViewAllButton({btnText}:{btnText:string} ){

    return (
        <div>
            <button className="flex flex-row items-center gap-x-2 cursor-pointer">
                    <p className="text-base text-center text-shadow-lg/10  text-[#606060] hover:text-[#bfbfbf]">
                       {btnText}
                    </p>
                    <Image src="/feather-icon/Shape (Stroke).svg" alt="ActionsImg" width={25} height={25} sizes="25px"/>
                </button>
        </div>
    )
}