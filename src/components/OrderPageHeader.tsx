import { Box } from "@mui/material";
import { Company } from "@prisma/client";
import Image from "next/image";

interface Props {
  company: Company | null;
}
export default function OrderPageHeader({ company }: Props) {
  if (!company) return null;
  return (
    <Box>
      <Image
        alt="orderAppHeaderImage"
        src="order-app-header.svg"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          color: "#023047",
        }}
      >
        <h1>{company.name}</h1>
      </Box>
    </Box>
  );
}
