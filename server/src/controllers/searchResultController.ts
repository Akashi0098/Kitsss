import { Request, Response } from "express";
import { searchMangaListServiceAPI } from "../utils/searchMangaServiceAPI"; // Import the search utility

// Controller for searching manga
export const searchResultController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const searchQuery = (req.query.q as string) || "";
  const offset = Number(req.query.offset) || 0;

  try {
    const getSearchResult = await searchMangaListServiceAPI(
      searchQuery,
      Number(offset)
    );

    // Send the search results as a JSON response
    res.json({ data: getSearchResult });
  } catch (error) {
    console.error("Error searching for manga:", error);
    res.status(500).send("Error searching for manga.");
  }
};
