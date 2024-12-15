import { Request, Response } from "express";
import { getChapterPagesServiceAPI } from "../utils/getChapterPagesServiceAPI";

export const readMangaController = async (req: Request, res: Response) => {
  const { chapterId } = req.params;

  try {
    const pageStream = getChapterPagesServiceAPI(chapterId);

    const readManga = [];
    for await (const page of pageStream) {
      readManga.push(page.pageUrl);
    }

    res.json({ data: readManga }); // Return pages as a JSON object with a 'data' property
  } catch (error) {
    console.error("Error fetching chapter pages:", error);
    res.status(500).send("Error fetching chapter pages.");
  }
};
