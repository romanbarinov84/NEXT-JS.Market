interface LoaderProps {
    text?:string;
    className?:string;
}


export default function Loader({text="",className=""}:LoaderProps){

    return(
        <>
         <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
      {text && (
        <p className="text-[var(--color-primary)]">Загрузка {text}...</p>
      )}
    </div>
        </>
    )
}