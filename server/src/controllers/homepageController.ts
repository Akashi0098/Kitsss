import { Request, Response } from "express";
import { getPopularMangaListServiceAPI } from "../utils/getPopularMangaServiceAPI";

export const homepageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Call the external function to fetch the manga list
    const getPopularManga = await getPopularMangaListServiceAPI();

    // Send the formatted manga list as JSON response
    res.json({ data: getPopularManga });
  } catch (error) {
    console.error("Error in getMangaList controller:", error);
    res.status(500).send("Error fetching manga list.");
  }
};
