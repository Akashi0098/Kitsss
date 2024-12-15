import { Request, Response } from "express";
import { getChaptersListServiceAPI } from "../utils/getChaptersListServiceAPI";
import { getMangaDetailsByIdServiceAPI } from "../utils/getMangaDetailsByIdServiceAPI";
export const mangaChaptersListController = async (
  req: Request,
  res: Response
) => {
  const { mangaId } = req.params;

  try {
    const getMangaChaptersList = await getChaptersListServiceAPI(mangaId);
    const getMangaDetailsByID = await getMangaDetailsByIdServiceAPI(mangaId);

    res.json({ getMangaChaptersList, getMangaDetailsByID });
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).send("Error fetching chapter list.");
  }
};
