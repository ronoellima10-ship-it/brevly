import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/app-error";

interface DeleteLinkRequest {
  id: string;
}

export async function deleteLink({ id }: DeleteLinkRequest) {
  const link = await prisma.link.findUnique({
    where: { id },
  });

  if (!link) {
    throw new AppError("Link não encontrado", 404);
  }

  await prisma.link.delete({
    where: { id },
  });
}