<script>
  import { onMount } from 'svelte';
  import SearchMangaInputComponent from '../components/searchMangaInputComponent.svelte';
  import PopularMangaListComponent from '../components/popularMangaListComponent.svelte';

  const fetchMangaData = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      const data = await response.json();
      return data.data; // Return manga data
    } catch (error) {
      console.error('Error fetching manga list:', error);
      return []; // Return an empty array on error
    }
  };

  let mangaData = []; // Store for fetched manga data

  onMount(async () => {
    mangaData = await fetchMangaData(); // Fetch manga data on mount
  });
</script>

<main>
  <div><SearchMangaInputComponent /></div>
  <div>
    <PopularMangaListComponent {mangaData} />
  </div>
</main>

<style>
  main {
    padding: 20px;
  }
</style>
