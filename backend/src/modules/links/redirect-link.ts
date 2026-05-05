import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/app-error";

interface RedirectLinkRequest {
  shortCode: string;
  ip?: string;
  userAgent?: string;
}

export async function redirectLink({
  shortCode,
  ip,
  userAgent,
}: RedirectLinkRequest) {
  const link = await prisma.link.findUnique({
    where: {
      shortCode,
    },
  });

 if (!link) {
    throw new AppError("Link não encontrado", 404);
  }

  await prisma.$transaction([
    prisma.accessLog.create({
      data: {
        linkId: link.id,
        ip,
        userAgent,
      },
    }),

    prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        accessCount: {
          increment: 1,
        },
      },
    }),
  ]);

  return link.originalUrl;
}