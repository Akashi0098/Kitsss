import axios from "axios";

export const getChapterPagesServiceAPI = async function* (chapterId: string) {
  const BASE_URL = `https://api.mangadex.org/at-home/server/${chapterId}`;

  try {
    const response = await axios.get(BASE_URL);

    // Destructure response data
    const { baseUrl, chapter } = response.data;

    if (!baseUrl || !chapter || !chapter.data) {
      throw new Error(
        "Invalid response data: Missing baseUrl or chapter data."
      );
    }

    const pageFilenames = chapter.data; // Array of page filenames

    // Stream pages one by one
    for (const filename of pageFilenames) {
      // Ensure filename is a string (if the API data changes in the future)
      if (typeof filename !== "string") {
        console.error("Invalid filename:", filename);
        continue; // Skip invalid filenames
      }

      const pageUrl = `${baseUrl}/data/${chapter.hash}/${filename}`;

      yield { pageUrl }; // Yield each page URL
    }
  } catch (error) {
    console.error("Error fetching chapter pages:", error);
    throw error; // Propagate the error for further handling
  }
};
