<script>
  export let mangaDetails = {};
  export let mangaId;
</script>

<main class="manga-details">
  <div class="manga-header">
    
    <!-- Image on the left -->
    <img class="manga-cover" src={mangaDetails.coverUrl} alt="{mangaDetails.title} cover" />

    <div class="manga-info">
      <!-- Title on the right -->
      <h1 class="manga-title">{mangaDetails.title}</h1>

      <!-- Genre/Tags below title -->
      <p class="manga-tags">{mangaDetails.tags}</p>

      <!-- Author below genre -->
      <p class="manga-author"> {mangaDetails.author}</p>
    </div>
  </div>

  <!-- Description below -->
  <p class="manga-description">{mangaDetails.description}</p>
</main>

<style>
  .manga-details {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .manga-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .manga-cover {
    width: 150px;
    height: auto;
    margin-right: 20px;
  }

  .manga-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .manga-title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
  }

  .manga-tags, .manga-author {
    font-size: 1rem;
    margin: 5px 0;
    color: #555;
  }

  .manga-description {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }
</style>
