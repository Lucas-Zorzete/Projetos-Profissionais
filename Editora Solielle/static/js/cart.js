// ======= CARRINHO POPUP =======
const btnCart = document.querySelector('.btn-cart');
const btnAdd = document.getElementById('btn-add');
const warnCart = document.getElementById('warn-cart');
const cartPopup = document.querySelector('#cart-popup');
const closeCart = document.querySelector('#close-cart');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const quantitySpan = document.querySelector('.quantity');

let cart = [];

function updateCartQuantity(change) {
    const cartBtn = document.getElementById('cart-btn');
    const quantitySpan = cartBtn.querySelector('.quantity');
    
    // Pega valor atual do data-quantity
    let current = parseInt(cartBtn.dataset.quantity);
    
    // Atualiza o valor
    current += change;
    
    // Impede número negativo
    if (current < 0) current = 0;
    
    // Atualiza no atributo e no texto
    cartBtn.dataset.quantity = current;
    quantitySpan.textContent = current;
}

/// Função para atualizar a interface do carrinho
function updateCart() {
  cartItems.innerHTML = cart.map(item => `
    <li>
      <img src="${item.cover}" alt="${item.title}">
      <div style="flex:1; margin-left:10px">
        <strong>${item.title}</strong><br>
        <span>R$${item.price.toFixed(2)}</span>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
    </li>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price, 0);
  cartTotal.textContent = `R$${total.toFixed(2).replace('.', ',')}`;
  quantitySpan.textContent = cart.length || '';
}

// Função para adicionar ao carrinho
function addToCart(id) {
  const book = BOOKS.find(b => b.id === id);
  if (!book) return;

  // Garante que o preço seja numérico (caso venha como string)
  book.price = parseFloat(book.price);

  cart.push(book);
  updateCart();
  updateCartQuantity(1);
  showToast(`${book.title} adicionado ao carrinho!`);
}

// Função para remover
function removeFromCart(id) {
    const index = cart.findIndex(b => b.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        
        updateCartQuantity(-1);
        updateCart();
    }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// Mostra popup
btnCart.addEventListener('click', () => {
  cartPopup.classList.add('active');
});

// Fecha popup
closeCart.addEventListener('click', () => {
  cartPopup.classList.remove('active');
});

cartPopup.addEventListener('click', (e) => {
  if (e.target === cartPopup) cartPopup.classList.remove('active');
});

// Atualizar os botões "Adicionar ao carrinho"
document.addEventListener('click', (e) => {
  if (e.target.matches('.btn-add')) {
    const id = +e.target.dataset.id;
    addToCart(id);
  }
});