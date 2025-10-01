
import Link from "next/link";
import SearchBlock from "../SearchBlock";
import { CatalogMenuProps } from "@/types/catalogMenuProps";
import ErrorComponent from "@/components/errorComponent/ErrorComponent";
import Loader from "@/components/Loader";

const CatalogMenu = ({
  isLoading,
  isCatalogOpen,
  setIsCatalogOpen,
  categories,
  searchBlockRef,
  menuRef,
  error,
  onMouseEnter,
  onFocusChangeAction,
}: CatalogMenuProps) => {
  return (
    <>
      <div
        className="flex items-center w-full"
        onMouseEnter={onMouseEnter}
        ref={searchBlockRef}
      >
        <SearchBlock onFocusChangeAction={onFocusChangeAction} />
      </div>

      {isCatalogOpen && (
        <div
          ref={menuRef}
          className="hidden md:block absolute top-full left-0 w-full bg-white shadow-(--shadow-catalog-menu) z-50"
        >
          <div className="mx-auto px-4 py-3">
            {error && (
              <ErrorComponent
                error={error.error}
                userMessage={error.userMessage}
              />
            )}
            {isLoading ? (
              <Loader />
            ) : categories && categories.length > 0 ? (
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/catalog/${category.slug}`}
                    className="block px-4 py-2 text-main-text hover:text-[#ff6633] font-bold duration-300"
                    onClick={() => setIsCatalogOpen(false)}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-2 text-center">Нет доступных категорий</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogMenu;