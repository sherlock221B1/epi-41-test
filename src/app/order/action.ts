"use server";

import { getMenuCategoriesByCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";

export async function getLOcationByTableId(tableId: number) {
  const table = await prisma.tables.findFirst({ where: { id: tableId } });
  const location = await prisma.locations.findFirst({
    where: { id: table?.locationId },
  });
  return location;
}

export async function getCompanyByTableId(tableId: number) {
  const location = await getLOcationByTableId(tableId);
  const company = await prisma.company.findFirst({
    where: { id: location?.companyId },
  });

  return company;
}

export async function getMenuCategoriesByTableId(tableId: number) {
  const company = await getCompanyByTableId(tableId);
  const location = await getLOcationByTableId(tableId);

  const allMenuCategories = await getMenuCategoriesByCompanyId();

  const disableMenuCategoriesAndLocation =
    await prisma.disableMenuCategoriesAndLocations.findMany({
      where: { locationId: location?.id },
    });
  const disableMenuCategoryIds = disableMenuCategoriesAndLocation.map(
    (item) => item.menuCategoryId
  );

  const menuCategories = allMenuCategories.filter(
    (menuCategory) => !disableMenuCategoryIds.includes(menuCategory.id)
  );

  return menuCategories;
}

export async function getMenusByMenuCategoryId(
  menuCategoryId: number,
  tableId: number
) {
  const menuCategories = await getMenuCategoriesByTableId(tableId);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  const location = await getLOcationByTableId(tableId);

  const menuCategoriesAndMenus = await prisma.menusCategoriesAndMenus.findMany({
    where: { menuCategoryIds: menuCategory?.id },
  });

  const menuIds = menuCategoriesAndMenus.map((item) => item.menuId);

  const menusByMenuCategory = await prisma.menus.findMany({
    where: { id: { in: menuIds } },
    include: { disableMenusAndLocations: true },
  });

  const disableMenus = menusByMenuCategory.filter((menu) =>
    menu.disableMenusAndLocations.find(
      (item) => item.menuId === menu.id && item.locationId === location?.id
    )
  );

  const disableMenuIds = disableMenus.map((item) => item.id);

  const menus = menusByMenuCategory.filter(
    (item) => !disableMenuIds.includes(item.id)
  );

  console.log("menusByMenuCategory are", menusByMenuCategory);
  console.log("disableMenus are", disableMenus);

  return menus;
}
