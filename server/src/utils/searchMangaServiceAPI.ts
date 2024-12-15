import axios from "axios";

// Function to search manga based on the search query
export const searchMangaListServiceAPI = async (
  search: string,
  offset: number = 0
) => {
  const MANGADEX_API_URL = "https://api.mangadex.org/manga";
  const COVER_BASE_URL = "https://uploads.mangadex.org/covers/"; // Base URL for cover images

  try {
    // Fetch the manga list from the MangaDex API with the search query and pagination
    const response = await axios.get(MANGADEX_API_URL, {
      params: {
        offset, // Pagination if needed
        title: search, // Searching by title
      },
    });

    // Fetch cover art for each manga and construct the full data
    const formattedMangaData = await Promise.all(
      response.data.data.map(async (manga: any) => {
        const { attributes, relationships } = manga;

        // Extract relevant fields from attributes
        const title =
          attributes.title.en ||
          attributes.title[Object.keys(attributes.title)[0]]; // Handle translations if needed
        const description =
          attributes.description.en ||
          attributes.description[Object.keys(attributes.description)[0]]; // Handle description translations

        // Find the cover_art relationship
        const cover = relationships.find(
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
          title,
          description,
          cover_url: coverUrl, // Constructed cover image URL
        };
      })
    );

    return formattedMangaData; // Return the formatted manga data
  } catch (error) {
    console.error("Error searching manga:", error);
    throw error;
  }
};
