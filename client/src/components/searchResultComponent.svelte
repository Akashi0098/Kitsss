<script>
    import { navigate } from 'svelte-routing'; 

    export let searchResults = []; 
    
    const goToChapters = (mangaId) => {
        navigate(`/manga/read/${mangaId}`);
    };
</script>

<ul>
  {#if searchResults.length === 0}
    <li>No results found.</li>
  {:else}
    {#each searchResults as manga (manga.id)}
      <li on:click={() => goToChapters(manga.id)} style="cursor: pointer;">
        <img src={manga.cover_url} alt={manga.title} />
        <div>
          <h2>{manga.title}</h2>
          <p>{manga.description}</p>
        </div>
      </li>
    {/each}
  {/if}
</ul>

<style>
  img {
    width: 100%;
    height: auto;
    max-width: 200px;
  }

  li {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    transition: box-shadow 0.3s ease;
  }

  li:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  p {
    font-size: 1rem;
    color: #555;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    cursor: pointer;
  }
</style>
