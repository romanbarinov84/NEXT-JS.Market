
export default function debounce <F extends (...args:unknown[]) => unknown> (
    fn:F,
    delay:number
): (...args:Parameters<F>) => void {
    let timeOutId:number;
    return function (...args:Parameters<F>){
        window.clearTimeout(timeOutId);
        timeOutId = window.setTimeout(() => fn(...args),delay);
    };
};