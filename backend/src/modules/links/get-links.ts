import { prisma } from "../../lib/prisma";

export async function getLinks() { // Get all links from the database, ordered by creation date (newest first)
  const links = await prisma.link.findMany({ // Find all links in the database
    orderBy: { // Order the links by creation date in descending order (newest first)
      createdAt: "desc", // Order by the createdAt field in descending order
    },
  });

  return links; // Return the list of links
}