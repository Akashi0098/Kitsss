import express from "express";

import { homepageController } from "../controllers/homepageController";
import { searchResultController } from "../controllers/searchResultController";
import { mangaChaptersListController } from "../controllers/mangaChaptersListController";
import { readMangaController } from "../controllers/readMangaController";

const router = express.Router();

router.get("/", homepageController);

router.get("/search", searchResultController);

router.get("/manga/read/:mangaId", mangaChaptersListController);

router.get("/manga/read/:mangaId/:chapterId", readMangaController);

export default router;
