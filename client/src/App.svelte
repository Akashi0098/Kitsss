<script>
  import { Router, Route } from 'svelte-routing';

  import homepage from './routes/homepage.svelte';
  import searchResultMangaPage from './routes/searchResultMangaPage.svelte';
  import mangaChaptersListPage from './routes/mangaChaptersListPage.svelte';
  import readMangaPage from './routes/readMangaPage.svelte';
  import path from 'path';

</script>

<main>
    <Router>
      <Route path="/" component={homepage} />
      <Route path="/search" component={searchResultMangaPage} />
      <Route path="/manga/read/:mangaId" component={mangaChaptersListPage} />
      <Route path="/manga/read/:mangaId/:chapterId" component={readMangaPage} />
    </Router>
</main>
