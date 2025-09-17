import { NextRequest, NextResponse } from "next/server";

import { CONFIG } from "../../../../../config/config";
import { getShortDecimalId } from "../../../../../utils/admin/shortDecimalId";
import { calculateAge } from "../../../../../utils/admin/calculateAge";
import { getDB } from "../../../../../utils/APIRotes";

interface UserFilter {
  region?: string;
  location?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(
      searchParams.get("limit") || CONFIG.DEFAULT_PAGE_SIZE.toString()
    );
    const page = parseInt(searchParams.get("page") || "1");
    const role = searchParams.get("role");
    const managerRegion = searchParams.get("managerRegion");
    const managerLocation = searchParams.get("managerLocation");
    const isManager = searchParams.get("isManager") === "true";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortDirection = searchParams.get("sortDirection") || "desc";


    if (role === "admin") {
      console.log("Вы админ");
}

    const db = await getDB();

    const filter: UserFilter = {};

    if (isManager && managerRegion && managerLocation) {
      filter.region = managerRegion;
      filter.location = managerLocation;
    }

    const sortOptions: { [key: string]: 1 | -1 } = {};
    sortOptions[sortBy] = sortDirection === "asc" ? 1 : -1;

    const users = await db
      .collection("user")
      .find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalCount = await db.collection("user").countDocuments(filter);

    const formattedUsers = users.map((user) => ({
      id: user._id.toString(),
      decimalId: getShortDecimalId(user._id.toString()),
      name: user.name || "",
      surname: user.surname || "",
      age: calculateAge(user.birthdayDate),
      email: user.email || "",
      phoneNumber: user.phoneNumber || "",
      role: user.role || "user",
      birthdayDate: user.birthdayDate || "",
      region: user.region || "",
      location: user.location || "",
      gender: user.gender || "",
      card: user.card || "",
      hasCard: user.hasCard || false,
      createdAt: user.createdAt
        ? user.createdAt.toISOString()
        : new Date().toISOString(),
      updatedAt: user.updatedAt
        ? user.updatedAt.toISOString()
        : new Date().toISOString(),
      emailVerified: user.emailVerified || false,
      phoneNumberVerified: user.phoneNumberVerified || false,
    }));

    return NextResponse.json({
      users: formattedUsers,
      totalCount,
    });
  } catch (error) {
    console.error("Ошибка при загрузке пользователей:", error);
    return NextResponse.json(
      { error: "Ошибка при загрузке пользователей" },
      { status: 500 }
    );
  }
}
