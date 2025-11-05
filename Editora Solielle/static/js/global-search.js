// ======= PESQUISA GLOBAL =======
const input = $('#search-input');
const results = $('#results');
const resultsCount = $('#results-count');
const resBooks = $('#results-books');
const resAuthors = $('#results-authors');
const resPosts = $('#results-posts');
const clearBtn = $('#clear-search');
const genreSelect = $('#genre');

const search = (q)=>{
  const nq = norm(q);
  const books = BOOKS.filter(b=> [b.title, b.author, b.genre].some(v=> norm(v).includes(nq)));
  const authors = AUTHORS.filter(a=> [a.name, a.bio].some(v=> norm(v).includes(nq)));
  const posts = POSTS.filter(p=> [p.title, p.excerpt].some(v=> norm(v).includes(nq)));

  // Painel de resultados
  const bHtml = books.length ? `<h4>Livros</h4>` + books.map(b=> `
    <div class="result-item">
      <img src="${b.cover}" alt="">
      <div>
        <div><strong>${highlight(b.title,q)}</strong></div>
        <div class="muted">${highlight(b.author,q)} • ${b.genre}</div>
      </div>
    </div>`).join('') : '';

  const aHtml = authors.length ? `<h4>Autores</h4>` + authors.map(a=> `
    <div class="result-item">
      <img src="${a.avatar}" alt="">
      <div>
        <div><strong>${highlight(a.name,q)}</strong></div>
        <div class="muted">${highlight(a.bio,q)}</div>
      </div>
    </div>`).join('') : '';

  const pHtml = posts.length ? `<h4>Posts</h4>` + posts.map(p=> `
    <div class="result-item">
      <img src="${p.cover}" alt="">
      <div>
        <div><strong>${highlight(p.title,q)}</strong></div>
        <div class="muted">${highlight(p.excerpt,q)}</div>
      </div>
    </div>`).join('') : '';

  resBooks.innerHTML = bHtml;
  resAuthors.innerHTML = aHtml;
  resPosts.innerHTML = pHtml;

  const total = books.length + authors.length + posts.length;
  resultsCount.textContent = total;
  results.style.display = total ? 'block' : 'none';

  // Atualiza o catálogo principal
  const genre = genreSelect.value;
  const visible = BOOKS.filter(b=> {
    const matchesQ = nq ? [b.title, b.author, b.genre].some(v=> norm(v).includes(nq)) : true;
    const matchesG = genre ? b.genre.includes(genre) : true;
    return matchesQ && matchesG;
  });
  renderBooks(visible);
};