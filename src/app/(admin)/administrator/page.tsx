"use client";

import { buttonStyles } from "@/app/(auth)/styles";
import Link from "next/link";

const AdminPanel = () => {
  return <>
   <div className="p-6">
      <h1 className="text-2xl text-main-text font-bold mb-6">Панель управления</h1>

      <div className="grid gap-4">
        <Link
          href="/administrator/users-list"
          className={`${buttonStyles.active} [&&]:justify-start px-4 py-2 w-full md:w-1/2`}
        >
          Управление пользователями
        </Link>
      </div>
    </div>
  </>;
};

export default AdminPanel;