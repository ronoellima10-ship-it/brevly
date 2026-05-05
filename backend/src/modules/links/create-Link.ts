import { prisma } from "../../lib/prisma";
import { nanoid } from "nanoid";
import { z } from "zod";

const createLinkSchema = z.object({
  originalUrl: z.string().url("URL inválida"),
});

async function generateUniqueShortCode() {
  let shortCode = nanoid(6);

  let linkAlreadyExists = await prisma.link.findUnique({
    where: { shortCode },
  });

  while (linkAlreadyExists) {
    shortCode = nanoid(6);

    linkAlreadyExists = await prisma.link.findUnique({
      where: { shortCode },
    });
  }

  return shortCode;
}

export async function createLink(data: unknown) {
  const { originalUrl } = createLinkSchema.parse(data);

  const shortCode = await generateUniqueShortCode();

  const link = await prisma.link.create({
    data: {
      originalUrl,
      shortCode,
    },
  });

  return link;
}