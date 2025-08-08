import CatalogMenuRapper from "./CatalogDropMenu/CatalogMenuRapper";

export default function Header() {
  return (
    <div>
      <header className="bg-white w-full md:shadow-(--shadow-default) relative z-50 flex flex-col md:flex-row md:gap-y-5 xl:gap-y-7 md:gap-10  md:p-2 justify-center">
        <CatalogMenuRapper />
      </header>
    </div>
  );
}
