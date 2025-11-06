const LAUNCHES = [
  {
    id: 1,
    title: "Entre o Sol e as Estrelas",
    author: "Lara Menezes",
    genre: "Romance • Autodescoberta",
    release: "Novembro 2025",
    cover: "../static/img/Entre_o_Sol_e_as_Estrelas.jpg",
    desc: "Uma história sobre encontrar a luz mesmo nas noites mais escuras."
  },
  {
    id: 2,
    title: "A Canção das Marés",
    author: "Daniela Luz",
    genre: "Ficção • Natureza • Poético",
    release: "Novembro 2025",
    cover: "../static/img/A_Cancao_das_Mares.jpg",
    desc: "Uma narrativa poética sobre amor, cura e o chamado do oceano."
  }
];

const ARTICLES = [
  { img: "../static/img/artigo1.png" },
  { img: "../static/img/artigo2.png" },
  { img: "../static/img/artigo3.png" },
  { img: "../static/img/artigo4.png" },
  { img: "../static/img/artigo5.png" },
  { img: "../static/img/artigo6.png" },
];

// ====== POP-UP DE LANÇAMENTOS ======
const launchModal = $('#launch-modal');
const launchGrid = $('#launch-grid');
const noLaunches = $('#no-launches');
const closeLaunchBtn = $('#launch-modal .close-btn');

// Função para abrir o modal
function openLaunchModal() {
  // Limpa o grid
  launchGrid.innerHTML = '';

  if (LAUNCHES.length === 0) {
    noLaunches.style.display = 'block';
  } else {
    noLaunches.style.display = 'none';
    launchGrid.innerHTML = LAUNCHES.map(b => `
      <div class="launch-card">
        <img src="${b.cover}" alt="Capa do livro ${b.title}">
        <h4>${b.title}</h4>
        <p><strong>${b.author}</strong></p>
        <p>${b.genre}</p>
        <p><em>${b.release}</em></p>
      </div>
    `).join('');
  }

  launchModal.style.display = 'flex';
}

// Fecha o modal
closeLaunchBtn.onclick = () => launchModal.style.display = 'none';
window.onclick = (e) => { if (e.target === launchModal) launchModal.style.display = 'none'; };

// Vincula o post de lançamentos ao modal
document.addEventListener('DOMContentLoaded', () => {
  const launchPost = [...document.querySelectorAll('.post')]
    .find(p => p.querySelector('h3')?.textContent.includes('Lançamentos'));
  if (launchPost) launchPost.addEventListener('click', openLaunchModal);
});

// ====== GALERIA DE ARTIGOS ======
const articlesModal = $('#articles-modal');
const articlesGrid = $('#articles-grid');
const closeArticlesBtn = $('#articles-modal .close-btn');

// Função para abrir o modal de artigos
function openArticlesModal() {
  articlesGrid.innerHTML = '';

  if (ARTICLES.length === 0) {
    articlesGrid.innerHTML = `<p style="text-align:center;color:#777;">Nenhum artigo publicado ainda 💭</p>`;
  } else {
    articlesGrid.innerHTML = ARTICLES.map(a => `
      <img src="${a.img}" alt="Imagem de artigo" class="article-img">
    `).join('');
  }

  articlesModal.style.display = 'flex';
}

// Fecha o modal
closeArticlesBtn.onclick = () => articlesModal.style.display = 'none';
window.onclick = (e) => { if (e.target === articlesModal) articlesModal.style.display = 'none'; };

// ===== Visualizador de imagem ampliada =====
const imgViewer = document.createElement('div');
imgViewer.id = 'img-viewer';
imgViewer.innerHTML = '<img>';
document.body.appendChild(imgViewer);

imgViewer.addEventListener('click', () => {
  imgViewer.classList.add('close-view');
  setTimeout(() => {
    imgViewer.style.display = 'none';
    imgViewer.classList.remove('close-view');
  }, 200);
});

// Abrir imagem ampliada ao clicar
document.addEventListener('click', e => {
  if (e.target.classList.contains('article-img')) {
    const img = imgViewer.querySelector('img');
    img.src = e.target.src;
    imgViewer.style.display = 'flex';
  }
});

// Vincula o post "Artigos" ao modal
document.addEventListener('DOMContentLoaded', () => {
  const articlePost = [...document.querySelectorAll('.post')]
    .find(p => p.querySelector('h3')?.textContent.includes('Artigos'));
  if (articlePost) articlePost.addEventListener('click', openArticlesModal);
});