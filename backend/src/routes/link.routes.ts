import { Router } from "express";
import { createLink } from "../modules/links/create-Link";
import { getLinks } from "../modules/links/get-links";
import { deleteLink } from "../modules/links/delete-link";
import { getLinkReport } from "../modules/links/get-link-report";
import { redirectLink } from "../modules/links/redirect-link";

export const linkRoutes = Router();

linkRoutes.post("/links", async (req, res, next) => {
  try {
    const link = await createLink(req.body);

    return res.status(201).json({
      ...link,
      shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
    });
  } catch (error) {
    next(error);
  }
});

linkRoutes.get("/links", async (req, res, next) => {
  try {
    const links = await getLinks();

    return res.json(
      links.map((link) => ({
        ...link,
        shortUrl: `${process.env.BASE_URL}/${link.shortCode}`,
      }))
    );
  } catch (error) {
    next(error);
  }
});

linkRoutes.delete("/links/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await deleteLink({ id });

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

linkRoutes.get("/links/:shortCode/report", async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const report = await getLinkReport({ shortCode });

    return res.json(report);
  } catch (error) {
    next(error);
  }
});

linkRoutes.get("/:shortCode", async (req, res, next) => {
  try {
    const { shortCode } = req.params;

    const originalUrl = await redirectLink({
      shortCode,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    return res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
});