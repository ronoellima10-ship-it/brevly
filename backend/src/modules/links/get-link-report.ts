import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/app-error";

interface GetLinkReportRequest {
  shortCode: string;
}

export async function getLinkReport({ shortCode }: GetLinkReportRequest) {
  const link = await prisma.link.findUnique({
    where: { shortCode },
    include: {
      accesses: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!link) {
      throw new AppError("Link não encontrado", 404);
    }

  return {
    id: link.id,
    originalUrl: link.originalUrl,
    shortCode: link.shortCode,
    accessCount: link.accessCount,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
    accesses: link.accesses,
  };
}