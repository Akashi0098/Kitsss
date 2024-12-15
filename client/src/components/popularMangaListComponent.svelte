<script>
  export let mangaData = []; // Prop to accept manga data from the parent
</script>

<ul>
  {#if mangaData.length === 0}
    <li>Loading popular manga...</li>
  {:else}
    {#each mangaData as manga (manga.id)}
      <li>
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
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 100%;
    height: auto;
    max-width: 200px;
  }

  h2 {
    font-size: 1.2rem;
    margin: 10px 0;
  }

  p {
    font-size: 1rem;
    color: #555;
  }
</style>
