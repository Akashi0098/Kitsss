import axios from "axios";

// Function to fetch a list of chapters for a given manga
export const getChaptersListServiceAPI = async (mangaId: string) => {
  const BASE_URL = "https://api.mangadex.org/chapter";

  try {
    // Fetch chapter list for the given mangaId
    const response = await axios.get(BASE_URL, {
      params: {
        manga: mangaId, // Filter by mangaId
        offset: 0, // Pagination offset
        limit: 100, // Limit to 100 chapters per request
        translatedLanguage: ["en"], // Filter for English translations
        "order[chapter]": "asc", // Order chapters in ascending order
      },
    });

    // Check if the API response is valid
    if (response.data.result !== "ok") {
      throw new Error(`Unexpected API response: ${response.data.result}`);
    }

    // Format the response data
    const formattedChaptersData = response.data.data.map((chapter: any) => {
      const { attributes, relationships } = chapter;

      // Extract relevant fields from attributes
      const title = attributes.title || "No Title Available";
      const chapterNumber = attributes.chapter || "N/A";
      const volume = attributes.volume || "N/A";

      // Return formatted chapter data
      return {
        id: chapter.id,
        title,
        chapter: chapterNumber,
        volume,
        externalUrl: attributes.externalUrl || "", // Provide the external URL if available
        publishAt: attributes.publishAt, // Publish date for the chapter
      };
    });

    // Return the formatted list of chapters
    return formattedChaptersData;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
};
