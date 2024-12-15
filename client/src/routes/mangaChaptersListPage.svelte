<script>
  import { onMount } from 'svelte';
  import MangaChaptersListComponent from '../components/mangaChaptersListComponent.svelte'; // Child component to display chapters
  import MangaDetailsHeaderComponent from '../components/mangaDetailsHeaderComponent.svelte';

  let mangaId;
  let chapters = []; // Local variable to store the chapters list
  let mangaDetails = {}; // Object to store manga details

  // Fetch manga chapters and details
  const fetchManga = async (mangaId) => {
    try {
      const response = await fetch(`http://localhost:5000/manga/read/${mangaId}`);
      const data = await response.json();

      chapters = data.getMangaChaptersList; // Store the chapters locally
      mangaDetails = data.getMangaDetailsByID; // Store the manga details locally

      console.log("Manga details:", mangaDetails);
      
    } catch (error) {
      console.error("Error fetching manga chapters:", error);
      chapters = []; // Fallback to an empty array on error
      mangaDetails = {}; // Reset manga details on error
    }
  };

  // Extract mangaId from the URL path and fetch the chapters
  onMount(() => {
    const pathSegments = window.location.pathname.split('/');
    mangaId = pathSegments[3]; // The mangaId is the third segment of the path
    if (mangaId) {
      fetchManga(mangaId);
    }
  });
</script>

<main>
  <MangaDetailsHeaderComponent {mangaDetails} {mangaId}/>

  <!-- Pass chapters data directly to the MangaChaptersListComponent -->
  <MangaChaptersListComponent {chapters} {mangaId} />
</main>

<style>
  main {
    padding: 20px;
  }
</style>
