"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { PATH_TRANSLATIONS } from "../../utils/pathTranslations";

export default function BreadCrumbs() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  if (pathName === "/" || pathName === "/search") return null;

  const pathSegments = pathName.split("/").filter((segment) => segment !== "");

  const productDesc = searchParams.get("desc");

  const breadCrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    let label = PATH_TRANSLATIONS[segment] || segment;

    if(
      index === pathSegments.length - 1 && productDesc &&
      pathSegments.includes("catalog") && 
      pathSegments.length >= 3
    ){
      label = decodeURIComponent(productDesc)
    }

    return {
      label,
      href,
      isLast: index === pathSegments.length - 1,
    };
  });

  breadCrumbs.unshift({
    label: "Головна",
    href: "/",
    isLast: false,
  });

  return (
    <nav className="px-[max(12px,calc((100%-1208px)/2))] my-6">
      <ol className="flex items-center gap-4 text-[8px] md:text-xs">
        {breadCrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            <div
              className={
                item.isLast
                  ? "text-[#8f8f8f]"
                  : "text-[text-main-text] hover:underline cursor-pointer"
              }
            >
              {item.isLast ? (
                item.label
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
