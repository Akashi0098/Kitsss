<script>
  import { onMount } from 'svelte';
  import SearchResultComponent from '../components/searchResultComponent.svelte'; // Child component to display results

  let searchQuery = new URLSearchParams(window.location.search).get('q') || ''; // Get search query from URL
  let searchResults = []; // Local variable to store search results

  // Function to fetch search results (formerly `getMangaSearchUtil`)
  const fetchSearchResults = async (search) => {
    try {
      const response = await fetch(`http://localhost:5000/search?q=${search}`);
      const data = await response.json();
      searchResults = data.data; // Store the search results locally
    } catch (error) {
      console.error("Error fetching manga list:", error);
      searchResults = []; // Fallback to an empty array on error
    }
  };

  // Fetch search results on component mount
  onMount(() => {
    fetchSearchResults(searchQuery);
  });
</script>

<main>
  <h1>Search Results for: {searchQuery}</h1>
  <!-- Pass searchResults directly to the SearchResultComponent -->
  <SearchResultComponent {searchResults} />
</main>

<style>
  main {
    padding: 20px;
  }
</style>
