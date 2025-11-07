// ======= DADOS DA SOLIELLE =======
const BOOKS = [
  {id: 1, title:'Fragmentos de Mim', author:'Gabrielle Côrrea', genre:'Poesias • Autobiografia • Literatura profunda', price:24.99, cover:'../static/img/Fragmentos_de_Mim.jpg'},
  {id: 2, title:'Onde o Tempo faz a Curva', author:'Thalita Monteiro', genre:'Memórias • Autobiografia', price:12.50, cover:'../static/img/Onde_o_Tempo_faz_a_Curva.jpg'},
];

const AUTHORS = [
  {
    name: 'Thalita Monteiro',
    avatar: '../static/img/avatar_thalita.jpeg',
    pet: '../static/img/Garfield_Solielle.png',
    width: 75,
    emoji: '🏵️',
    bio: 'O coração das palavras, que vive a escrita intensamente, trazendo emoção, drama e paixão pela literatura.<br><br> Ama escrever, se emociona com histórias e, na Solielle, cuida dos textos com carinho e respeito, para que as palavras cheguem a quem precisa lê-las.'
  },
  {
    name: 'Gabrielle Côrrea',
    avatar: '../static/img/avatar_bibi.jpeg',
    pet: '../static/img/Snoopy_Solielle.png',
    width: 88,
    emoji: '🌸',
    bio: 'A criativa sensível que transforma sentimentos em imagens e formas com doçura e olhar artístico.<br><br> Ama criar em traços e palavras, encontrou na arte um refúgio e um jeito de dar voz ao que sente. Na Solielle, transforma emoções em criações que acolhem e inspiram.'
  },
  {
    name: 'Sofia Mendes',
    avatar: '../static/img/avatar_sofia.jpeg',
    pet: '../static/img/Pooh_Solielle.png',
    width: 65,
    emoji: '🌻',
    bio: 'A mente inquieta e comunicativa, cheia de ideias e estratégias para levar histórias mais longe.<br><br> Ama desenhar e escrever, encontrou na criação uma forma de se expressar e se sentir em paz. Cuida das palavras e ideias para que transmitam verdade e acolhimento.'
  }
];

const POSTS = [
  {id: 1, title:'Lançamentos do mês', excerpt:'Confira os livros que chegam às prateleiras este mês.', cover:'../static/img/lançamentos.png'},
  {id: 2, title:'Listas e recomendações dos autores', excerpt:'“3 motivos para continuar escrevendo”, “Como criar personagem marcante?”...', cover:'../static/img/recomendações.png'},
  {id: 3, title:'Artigos que inspiram os autores', excerpt:'Confira as reflexões, curiosidades e textos curtos que estimulam os autores.', cover:'../static/img/artigos.png'}
];

// ======= FUNÇÕES AUXILIARES =======
const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => [...el.querySelectorAll(sel)];
const norm = s => (s||'').toString().normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const highlight = (text, q) => {
  if (!q) return text;
  const ntext = text;
  const idx = norm(text).indexOf(norm(q));
  if (idx === -1) return text;
  const realStart = [...text].slice(0, idx).join('').length;
  return ntext.substring(0, realStart) + '<mark>' + ntext.substring(realStart, realStart + q.length) + '</mark>' + ntext.substring(realStart + q.length);
};

// ======= RENDERIZAÇÃO =======
const booksGrid = $('#books-grid');
const renderBooks = (list) => {
  booksGrid.innerHTML = list.map(b => {
    const price = parseFloat(b.price).toFixed(2).replace('.', ','); // garante decimais e vírgula
    return `
      <article class="card" data-title="${b.title}" data-author="${b.author}" data-genre="${b.genre}">
        <img class="cover" src="${b.cover}" alt="Capa do livro ${b.title}">
        <div class="body">
          <h3>${b.title}</h3>
          <div class="meta">${b.author} • ${b.genre}</div>
          <div class="price"><p>R$ ${price}</p></div>
          <div class="buttons" style="display: flex; flex-direction: column; gap: .8rem">
            <button onclick="sendWhats('${b.title}', ${b.price})" class="btn" style="font-size: 1em">
              <i class="ri-whatsapp-line" style="font-size: 1em; font-weight: 300;"></i> 
              Comprar
            </button>
            <button class="btn btn-add" data-id="${b.id}" style="background-color: #75B9B0">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
};


const authorsGrid = $('#authors-grid');
const renderAuthors = (list) => {
  authorsGrid.innerHTML = list.map(a => `
    <article class="team reveal">
        <div class="card-inner">
            <div class="card-front">
                <img src="${a.avatar}" style="border-radius: 1rem; display: block;">
                <h2>${a.emoji} ${a.name}</h2>
            </div>
            <div class="card-back">
                <div class="avatar" style="display: flex; align-items: center; gap: 40%;">
                    <img src="${a.avatar}" id="icon-author" alt="Foto de ${a.name}">
                    <img src="${a.pet}" alt="Mascote de ${a.name}" class="pet" width="${a.width}">
                </div>
                <h3>${a.emoji} ${a.name}</h3>
                <p>${a.bio}</p>
            </div>
        </div>
    </article>
  `).join('');
};

const postsList = $('#posts-list');
const renderPosts = (list) => {
    postsList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr)';
    postsList.innerHTML = list.map(p => `
    <article class="post reveal" data-id="${p.id}">
      <img src="${p.cover}" alt="Imagem do post ${p.title}">
      <div style="padding: .7rem; display:flex; flex-direction:column; justify-content: space-between; gap:.4rem;">
        <h3 style="font-size: 1em;">${p.title}</h3>
        <p class="muted" style="font-size: .8em;">${p.excerpt}</p>
        <a class="btn more" href="#" style="display: flex; align-items: center; gap: .8rem; font-size: .9em; padding: .7rem;">
            Ler mais <i class="ri-arrow-right-long-line" style="font-size: 1.4em;"></i>
        </a>
      </div>
    </article>
  `).join('');

  // --- Ativa o modal ao clicar ---
  document.querySelectorAll('.post').forEach(post => {
    post.addEventListener('click', () => {
      const id = post.dataset.id;
      openModal(id);
    });
  });
};

// Render inicial
renderBooks(BOOKS);
renderAuthors(AUTHORS);
renderPosts(POSTS);

// ======= HEADER ENCOLHER AO SCROLL =======
const siteHeader = $('#site-header');
let lastY = 0;
addEventListener('scroll', () => {
  const y = scrollY || document.documentElement.scrollTop;
  siteHeader.classList.toggle('shrink', y > 18);
  lastY = y;
}, {passive: true});


// ======= REVELAR ELEMENTOS AO ROLAR =======
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, {rootMargin:'-40px 0px'});
$$('.reveal').forEach(el => io.observe(el));


// ======= SLIDER BANNER =======
const slides = $$('.slide');
const dots = $('#dots');
slides.forEach((_,i)=>{
  const b = document.createElement('button');
  b.setAttribute('aria-label', `Ir para slide ${i+1}`);
  b.addEventListener('click', ()=>showSlide(i));
  dots.appendChild(b);
});
let current = 0, timer;
const showSlide = (i)=>{
  slides[current].classList.remove('active');
  dots.children[current].classList.remove('active');
  current = i;
  slides[current].classList.add('active');
  dots.children[current].classList.add('active');
  restart();
};
const next = ()=> showSlide( (current+1) % slides.length );
const restart = ()=>{ clearInterval(timer); timer = setInterval(next, 4500); };
showSlide(0);

// Debounce
let t; const debounced = (fn, wait=140) => (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args), wait); };
input.addEventListener('input', debounced(()=>{
  const q = input.value.trim();
  const url = new URL(location);
  if(q){ url.searchParams.set('q', q); } else { url.searchParams.delete('q'); }
  history.replaceState({},'', url);
  search(q);
}, 160));

clearBtn.addEventListener('click', ()=>{
  input.value=''; input.focus(); search('');
  const url = new URL(location); url.searchParams.delete('q'); history.replaceState({},'', url);
});

// Fecha painel de resultados ao clicar fora
document.addEventListener('click', (e)=>{
  if(results.style.display==='block'){
    const within = results.contains(e.target) || $('.searchbar').contains(e.target);
    if(!within) results.style.display='none';
  }
});

// Filtro por gênero
genreSelect.addEventListener('change', ()=> search(input.value.trim()));

// Carrega busca inicial
const params = new URLSearchParams(location.search);
const initialQ = params.get('q') || '';
if(initialQ){ input.value = initialQ; search(initialQ); }

// Atalhos de teclado
addEventListener('keydown', (e)=>{
  if(e.key === '/' && document.activeElement !== input){ e.preventDefault(); input.focus(); }
  if(e.key === 'Escape'){ results.style.display='none'; }
});