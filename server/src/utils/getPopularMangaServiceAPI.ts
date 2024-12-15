import axios from "axios";

// Function to fetch manga list from MangaDex API
export const getPopularMangaListServiceAPI = async (): Promise<any> => {
  const MANGADEX_API_URL = "https://api.mangadex.org/manga";
  const COVER_BASE_URL = "https://uploads.mangadex.org/covers/"; // Base URL for cover images

  try {
    // Fetch the manga list from the MangaDex API
    const response = await axios.get(MANGADEX_API_URL, {});

    // Fetch cover art for each manga and construct the full data
    const formattedMangaData = await Promise.all(
      response.data.data.map(async (manga: any) => {
        // Find the cover_art relationship
        const cover = manga.relationships.find(
          (rel: any) => rel.type === "cover_art"
        );

        // If cover exists, fetch its details
        let coverUrl = "default_cover_url"; // Fallback cover URL
        if (cover && cover.id) {
          try {
            // Fetch the cover image details using the cover ID
            const coverResponse = await axios.get(
              `https://api.mangadex.org/cover/${cover.id}`
            );
            const coverFileName = coverResponse.data.data?.attributes?.fileName;

            // Construct the full URL for the cover image
            if (coverFileName) {
              coverUrl = `${COVER_BASE_URL}${manga.id}/${coverFileName}`;
            }
          } catch (coverError) {
            console.error("Error fetching cover image:", coverError);
          }
        }

        // Return the formatted manga data
        return {
          id: manga.id,
          title: manga.attributes?.title?.en || "No Title", // Fallback title
          description: manga.attributes?.description?.en || "No Description", // Fallback description
          cover_url: coverUrl, // Constructed cover image URL
        };
      })
    );

    return formattedMangaData; // Return the formatted manga data
  } catch (error) {
    console.error("Error fetching manga list from MangaDex:", error);
    throw new Error("Failed to fetch manga list.");
  }
};
