<script>
  export let pages = []; // Receive pages from parent
  export let loading = true; // Receive loading state from parent
  export let error = null; // Receive error message from parent
</script>

{#if loading}
  <p class="loading">Loading pages...</p>
{:else if error}
  <p class="error">{error}</p>
{:else}
  <div class="pages">
    {#each pages as pageUrl, index (pageUrl)}
      <div class="page" key={index}>
        <img src={pageUrl} alt="Page {index + 1}" />
      </div>
    {/each}
  </div>
{/if}

<style>
  .loading,
  .error {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
  }

  .pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .page {
    margin-bottom: 50px; /* Add space between pages */
  }

  .page img {
    max-width: 100%; /* Keep images responsive */
    max-height: 300vh; /* Prevent images from exceeding viewport height */
    object-fit: contain; /* Maintain aspect ratio */
    border: 1px solid #ccc; /* Optional: Add a light border */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better visibility */
  }
</style>
