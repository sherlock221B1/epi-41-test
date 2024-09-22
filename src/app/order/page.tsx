import OrderPageHeader from "@/components/OrderPageHeader";
import { Box } from "@mui/material";
import {
  getCompanyByTableId,
  getMenuCategoriesByTableId,
  getMenusByMenuCategoryId,
} from "./action";
import MenuCategoryTabs from "./MenuCategoryTabs";
import MenuCardOrderApp from "./MenuCardOrderApp";
import { useState } from "react";
import OrderAppMenus from "./OrderAppMenus";

interface Props {
  searchParams: {
    tableId: string;
  };
}
export default async function OrderPage({ searchParams }: Props) {
  const tableId = Number(searchParams.tableId);
  const company = await getCompanyByTableId(tableId);
  const menuCategories = await getMenuCategoriesByTableId(tableId);

  return (
    <Box>
      <OrderPageHeader company={company} />
      <MenuCategoryTabs menuCategories={menuCategories} tableId={tableId} />
      {/* <OrderAppMenus tableId={tableId} /> */}
    </Box>
  );
}
