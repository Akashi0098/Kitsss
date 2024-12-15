import axios from "axios";

export const getMangaDetailsByIdServiceAPI = async (mangaId: string) => {
  const BASE_URL = "https://api.mangadex.org/manga";
  const COVER_BASE_URL = "https://uploads.mangadex.org/covers/";
  const AUTHOR_BASE_URL = "https://api.mangadex.org/author";

  try {
    // Fetch manga details from the MangaDex API
    const response = await axios.get(`${BASE_URL}/${mangaId}`);

    if (response.data.result === "ok") {
      const mangaData = response.data.data;

      // Extract necessary information
      const title =
        mangaData.attributes.title[
          Object.keys(mangaData.attributes.title)[0]
        ] || "Unknown Title";
      const description =
        mangaData.attributes.description[
          Object.keys(mangaData.attributes.description)[0]
        ] || "No description available.";
      const status = mangaData.attributes.status;
      const publicationDemographic =
        mangaData.attributes.publicationDemographic;
      const year = mangaData.attributes.year;
      const contentRating = mangaData.attributes.contentRating;
      const availableLanguages =
        mangaData.attributes.availableTranslatedLanguages || [];
      const tags = mangaData.attributes.tags
        .map(
          (tag: any) => tag.attributes.name[Object.keys(tag.attributes.name)[0]]
        )
        .join(", ");
      const latestUploadedChapter = mangaData.attributes.latestUploadedChapter;

      // Extract cover URL
      let coverUrl = "default_cover.jpg"; // Default cover fallback
      const coverRel = mangaData.relationships.find(
        (rel: any) => rel.type === "cover_art"
      );
      if (coverRel && coverRel.id) {
        try {
          const coverResponse = await axios.get(
            `https://api.mangadex.org/cover/${coverRel.id}`
          );
          const coverFileName = coverResponse.data.data?.attributes?.fileName;
          if (coverFileName) {
            coverUrl = `${COVER_BASE_URL}${mangaData.id}/${coverFileName}`;
          }
        } catch (coverError) {
          console.error("Error fetching cover image:", coverError);
        }
      }

      // Extract author ID from relationships
      let author = "Unknown Author";
      const authorRel = mangaData.relationships.find(
        (rel: any) => rel.type === "author"
      );

      if (authorRel && authorRel.id) {
        try {
          // Fetch author details
          const authorResponse = await axios.get(
            `${AUTHOR_BASE_URL}/${authorRel.id}`
          );
          author = authorResponse.data.data.attributes.name || "Unknown Author";
        } catch (authorError) {
          console.error("Error fetching author details:", authorError);
        }
      }

      return {
        id: mangaData.id,
        title,
        description,
        status,
        publicationDemographic,
        year,
        contentRating,
        availableLanguages,
        tags,
        latestUploadedChapter,
        coverUrl,
        author,
      };
    } else {
      console.error("Failed to fetch manga details: ", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return null;
  }
};
