"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Menus, MenusCategories } from "@prisma/client";
import { useEffect, useState } from "react";
import { getMenusByMenuCategoryId } from "./action";
import MenuCardOrderApp from "./MenuCardOrderApp";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  menuCategories: MenusCategories[];
  tableId: number;
}
export default function MenuCategoryTabs({ menuCategories, tableId }: Props) {
  const [value, setValue] = React.useState(0);
  const [menus, setMenus] = useState<Menus[]>([]);
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState(0);

  useEffect(() => {
    handleGetMenus();
  }, [selectedMenuCategoryId]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGetMenus = async () => {
    const menus = await getMenusByMenuCategoryId(
      selectedMenuCategoryId,
      tableId
    );
    setMenus(menus);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {menuCategories.map((menuCategory) => {
            return (
              <Tab
                label={menuCategory.name}
                key={menuCategory.id}
                onClick={() => {
                  setSelectedMenuCategoryId(menuCategory.id);
                  console.log(selectedMenuCategoryId);
                }}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "warp",
          mt: 4,
        }}
      >
        {menus.map((menu) => {
          return <MenuCardOrderApp menu={menu} key={menu.id} />;
        })}
      </Box>
    </Box>
  );
}
