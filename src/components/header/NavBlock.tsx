export default function NavBlock() {
  return (
    <div className="bg-amber-100 w-full">
      <ul className="flex justify-center flex-wrap items-center  gap-10 md:shadow-(--shadow-default)">
        <li>
          <a href="#">Головна</a>
        </li>
        <li>
          <a href="#">Про нас</a>
        </li>

        <li>
          <a href="#">Меню</a>
        </li>
        <li>
          <a href="#">Магазини</a>
        </li>
        <li>
          <a href="#">Карта магазинів</a>
        </li>
        <li>
          <a href="#">Контакти</a>
        </li>
      </ul>
    </div>
  );
}
