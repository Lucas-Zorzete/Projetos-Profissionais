// ====== slide banner ======
const slides = $$('.slide');   // guarda todas as imagens em uma variável
const dots = $('#dots');  // guarda os pontinhos em uma variável

slides.forEach((_, i) => {  // faz um loop em todos os slides
    const b = document.createElement('button');

    b.setAttribute('aria-label', `Ir para o slide ${i+1}`); // rótulo de acessibilidade no botão para deficientes visuais
    b.addEventListener('click', () => showSlide(i)); // ao clicar no b, chama a função showSlide(i)

    dots.appendChild(b); // insere os pontinhos dentro do elemento #dots 
});

let current = 0;  // slide atual -> 0
let timer; // temporizador do setInterval

const showSlide = (i) => {  // cria a função showSlide que mostra um slide específico (i)
    slides[current].classList.remove('active');
    dots.children[current].classList.remove('active');

    current = i; // atualiza o slide atual
    slides[current].classList.add('active');
    dots.children[current].classList.add('active');
    restart(); // reiniciar o temporizador
};

const next = () => showSlide((current + 1) % slides.length); // contador volta para zero ao chegar no último slide
const restart = () => {  // cria uma função para o restart
    clearInterval(timer);
    timer = setInterval(next, 4500);  // 4,5 segundos a cada troca de slide
};
showSlide(0); // mostra o primeiro slide ao carregar a página 

// ======= DADOS DEMO ======== 
const BOOKS = [
    {id:1, title:'Fragmentos de Mim', price: 24.99, author:'Gabrielle Côrrea', genre:'Poesias • Autobiografia • Profundo', cover:'../img/Fragmentos_de_Mim.jpg'},
    {id:2, title:'Onde o Tempo faz a Curva', price: , author:'Thalita Monteiro', genre:'Memórias • Autobiografia • Drama', cover:'../img/Onde_o_Tempo_faz_a_Curva.jpg'},
    {id:3, title:'Check-In Mental', price: , author:'Gabrielle Côrrea', genre:'Ficção Psicológica • Cura Emocional • Empatia', cover:'../img/Check-In_Mental.jpg'},
    {id:4, title:'A Casa Onde Dormem as Mulheres', price: , author:'Thalita Monteiro', genre:'Realismo Social • Ficção Literária • Feminilidade', cover:'../img/a_Casa_Onde_Dormem_as_Mulheres.jpg'}
];

// ======= RENDERIZAR ========
const booksGrid = $('#books-grid');
const renderBooks = (list) => {
    booksGrid.innerHTML = list.map(b => `
        <article class="card" data-title="${b.title}" data-author="${b.author}" data-genre="${b.genre}">
            <img class="cover" src="${b.cover}" alt="Capa do Livro ${next.title}">
            <div class="body">
                <h3>${b.title}</h3>
                <div class="meta">${b.author} • ${genre}</div>
                <div class="price"> <p>R$${b.price},00</p></div>
                <button class="btn" onclick="alert('Comprar: ${b.title} (demo))">Comprar</button>
                <button class="btn" onclick="alert('Adicionar Carrinho: ${b.title} (demo))">Adicionar Carrinho</button>
            </div>
        </article>
        `).join('');
};