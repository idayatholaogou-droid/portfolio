<script>
  const tabs  = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.project-card');
  const grids = document.querySelectorAll('.projects-grid');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.toggle('active', t === tab));
      const filter = tab.dataset.filter;

      // 1. Affiche ou masque chaque carte selon sa catégorie
      cards.forEach(card => {
        const cats = (card.dataset.category || '').split(' ');
        card.hidden = filter !== 'all' && !cats.includes(filter);
      });

      // 2. Masque les grilles vides, avec le h3 qui les précède
      grids.forEach(grid => {
        const hasVisible = grid.querySelector('.project-card:not([hidden])');
        grid.hidden = !hasVisible;
        const title = grid.previousElementSibling;
        if (title && title.classList.contains('category-title')) {
          title.hidden = !hasVisible;
        }
      });
    });
  });
</script>