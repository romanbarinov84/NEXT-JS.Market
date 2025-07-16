import HeaderUserBlock from "./userBlock/UserBlock";
import LogoBlock from "./LogoBlock";
import NavBlock from "./NavBlock";
import SearchBlock from "./SearchBlock";

export default function Header() {
  return (
    <div>
      <header className="bg-white w-full md:shadow-(--shadow-default) relative z-50 flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap-10  md:p-2 justify-center">
        <div className="flex w-full mt-2 flex-row gap-4 xl:gap-10 py-2 px-4 items-center md:shadow-(--shadow-default)">
          <LogoBlock />
          <SearchBlock />
          <nav aria-label="aheadContent">
          <HeaderUserBlock />
        </nav>
        </div>

        
      </header>
      <NavBlock />
    </div>
  );
}
