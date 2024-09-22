"use server";

import { getCompanyId } from "@/libs/action";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function getCompany() {
  const companyId = await getCompanyId();
  return await prisma.company.findFirst({
    where: { id: companyId },
  });
}

export async function updatingCompany(formData: FormData) {
  const name = formData.get("name") as string;
  const id = Number(formData.get("id"));

  await prisma.company.update({ data: { name }, where: { id } });
  redirect("/backoffice");
}
