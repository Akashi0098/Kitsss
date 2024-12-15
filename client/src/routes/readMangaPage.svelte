<script>
  import "../global.css";
  import { onMount } from "svelte";
  import ReadMangaComponent from "../components/readMangaComponent.svelte"; // Child component

  let mangaId;
  let chapterId;
  let pages = []; // Local variable to store fetched chapter pages
  let loading = true;
  let error = null;

  // Function to fetch pages for the manga and chapter
  const fetchChapterPages = async (mangaId, chapterId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/manga/read/${mangaId}/${chapterId}`
      );
      const data = await response.json();
      
      // Prepend baseUrl to each image filename in the response data
      pages = data.data.map((image) => `${image}`);
      
      loading = false; // Stop loading once data is fetched
    } catch (err) {
      error = "Failed to load pages.";
      loading = false; // Stop loading even if there's an error
    }
  };

  // Extract mangaId and chapterId from the URL and fetch pages on mount
  onMount(() => {
    const pathSegments = window.location.pathname.split("/");
    mangaId = pathSegments[3]; // Extract mangaId
    chapterId = pathSegments[4]; // Extract chapterId

    if (mangaId && chapterId) {
      fetchChapterPages(mangaId, chapterId);
    }
  });
</script>

<main>
  <!-- Pass pages data directly to the ReadMangaComponent -->
  <div><ReadMangaComponent {pages} {loading} {error} /></div>
</main>

<style>

</style>
