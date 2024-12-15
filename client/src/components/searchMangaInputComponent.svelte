<script>
  import { createEventDispatcher } from 'svelte';
  import { navigate } from 'svelte-routing'; // Use navigate from svelte-routing for redirection

  const dispatch = createEventDispatcher();
  let searchQuery = ''; // Bind the search input value

  // Handle search action and redirect to the /search page with query
  const handleSearch = () => {
    if (searchQuery.trim() !== '') {  
      // Redirect to /search page with query as a URL parameter
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };
</script>

<div>
  <input
    type="text"
    placeholder="Search manga..."
    bind:value={searchQuery}
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button on:click={handleSearch}>Search</button>
</div>

<style>
  input {
    width: calc(100% - 90px);
    padding: 10px;
    margin-right: 10px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  div {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
</style>
