<script>
  export let chapters = []; // Accept chapters as a prop from parent
  export let mangaId; // Accept mangaId as a prop from parent

  // Navigate to the chapter's reading page
  const readChapter = (chapterId) => {
    window.location.href = `/manga/read/${mangaId}/${chapterId}`; // Use simple navigation without routing library
  };
</script>

<ul>
  {#if chapters.length > 0}
    {#each chapters as chapter (chapter.id)}
      <li on:click={() => readChapter(chapter.id)} style="cursor: pointer;">
        {chapter.title} (Chapter {chapter.chapter})
      </li>
    {/each}
  {:else}
    <p>No chapters found.</p>
  {/if}
</ul>

<style>
  li {
    margin-bottom: 15px;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.2s;
  }

  li:hover {
    background-color: #f0f0f0;
  }

  p {
    color: #777;
  }
</style>
