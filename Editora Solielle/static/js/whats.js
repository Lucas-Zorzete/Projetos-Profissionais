// document.getElementById('contactForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const response = await fetch('/send_email', {
//         method: 'POST',
//         body: formData
//     });

//     const result = await response.text();
//     document.getElementById('response').innerHTML = result;
// })

function sendWhats(title, price) {
    const phone = 5511948573463;

    const text = `Olá! Me chamo (seu nome).\nVim pelo site da *Solielle* e gostaria de comprar o livro *${title}* por R$${price},00.\nPoderia me ajudar com a compra?`;
    const msgFormated = encodeURIComponent(text);
    
    const url = `https://wa.me/${phone}/?text=${msgFormated}`;
    
    window.open(url, '_blank');
}

function finalizePurchase() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio! Adicione algum livro antes de finalizar a compra 🌸");
    return;
  }

  const phone = 5511948573463;
  const total = cart.reduce((sum, b) => sum + b.price, 0);
  const bookList = cart.map(b => `*${b.title}* — R$${b.price},00`).join('\n');

  const text = 
`Olá! Me chamo (seu nome) e vim pelo site da *Solielle*.\n
Gostaria de finalizar minha compra com os seguintes livros:\n
${bookList}\n
*Total:* R$${total},00\n
Poderiam me ajudar com o pagamento e envio?`;

  const msgFormated = encodeURIComponent(text);
  const link = `https://wa.me/${phone}?text=${msgFormated}`;
  window.open(link, '_blank');
}