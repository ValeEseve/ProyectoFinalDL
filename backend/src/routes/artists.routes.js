import { Router } from "express";
import { getAllArtists, getArtistBySlug, getPrintsBySlug } from "../controllers/artists.controller.js";

const router = Router();

router.get("/", getAllArtists);
router.get("/:slug", getArtistBySlug)
router.get("/:slug/prints", getPrintsBySlug)

export default router;
