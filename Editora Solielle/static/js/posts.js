const LAUNCHES = [
  {
    id: 1, 
    title:'Check-In Mental', 
    author:'Gabrielle Côrrea', 
    genre:'Ficção Psicológica • Cura Emocional', 
    cover:'../static/img/Check-In_Mental.jpg',
    margintop: 50,
    bio: "Na Residência Psique, um refúgio voltado à saúde mental, hóspedes enfrentam seus traumas e emoções profundas sob o olhar sensível de Luna, a recepcionista que narra histórias de dor, superação e empatia. Um retrato humano sobre reconstrução interior e o poder de ouvir e ser ouvido."
},
  {
    id: 2, 
    title:'A Casa Onde Dormem as Mulheres', 
    author:'Thalita Monteiro', 
    genre:'Realismo Social • Feminilidade', 
    cover:'../static/img/a_Casa_Onde_Dormem_as_Mulheres.jpg',
    bio: "Em A Casa Onde Dormem as Mulheres, vítimas de violências e perdas encontram refúgio para curar suas feridas e reencontrar a própria voz. A obra é um relato poético sobre dor, resistência, perdão e renascimento feminino."
}
];

const ARTICLES = [
  { img: "../static/img/artigo1.png", caption: "Para alguns, é só um caderno e uma caneta. Para outros, é o único jeito de manter a sanidade. 🖋✨" },
  { img: "../static/img/artigo2.png", caption: "Nem toda escrita precisa de aplausos. Às vezes, é só a alma pedindo para respirar entre as linhas. 📝💛" },
  { img: "../static/img/artigo3.png", caption: "✨ Quantas vezes você já imaginou segurar sua própria história impressa? Sentir o peso dos seus personagens, das suas palavras, do seu sonho realizado?" },
  { img: "../static/img/artigo4.png", caption: "📝✨ Quando o coração fala mais alto que a razão… Essa é uma das declarações mais intensas da literatura, capaz de tocar até os sentimentos mais adormecidos 💛" },
  { img: "../static/img/artigo5.png", caption: "Algumas perdas podem ser encontradas no tempo certo, outras, jamais deveriam ter sido deixadas para trás. Uma lembrança de sabedoria direto da Terra Média com Gandalf, o Cinzento. ✨" },
  { img: "../static/img/artigo6.png", caption: "📚 Da nossa editora pra você, que escreve, sente, sonha e segue mesmo com frio na barriga. O show é seu. 💫" }
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
        <h4 style="margin-top: ${b.margintop}px">${b.title}</h4>
        <p><strong>${b.author}</strong></p>
        <p>${b.genre}</p>
        <p>${b.bio}</p>
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
      <div class="article-item">
        <img src="${a.img}" alt="Imagem de artigo" class="article-img">
        <p class="article-caption">${a.caption}</p>
      </div>
    `).join('');
  }

  articlesModal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // impede scroll do fundo
}

// Fecha o modal
closeArticlesBtn.onclick = () => {
  articlesModal.style.display = 'none';
  document.body.style.overflow = 'auto';
};
window.onclick = (e) => { 
  if (e.target === articlesModal) {
    articlesModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

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
