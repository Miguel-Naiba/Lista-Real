const produtos = [
    {
        titulo: "César",
        preco: "$ 259 Bananas",
        imagem: "https://pbs.twimg.com/profile_images/1067870218456715264/XIWPNodw_400x400.jpg"
    },
    {
        titulo: "Gorila",
        preco: "$ 999.99 Bananas",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DRlQ7dvuPD15NcWGHdU2qH7taprrSsIRLw&s"
    },
    {
        titulo: "Le Monke",
        preco: "$ 299 Bananas",
        imagem: "https://static.wikia.nocookie.net/bbkcm/images/9/91/LeMonke.png/revision/latest?cb=20230827171036"
    },
    {
        titulo: "monke",
        preco: "$ 999 Bananas",
        imagem: "https://media.revide.com.br/cache/74/97/7497fce570a4f03d95cca60533936a6c.jpg" 
    }
];
const produtosNaCesta = [];
 
const container = document.getElementById('container');
const listaC = document.querySelector('.listaC'); 
listaC.classList.add('escondida');

function adicionarProdutosAoContainer() {
    produtos.forEach((produto, index) => {
        const divProduto = document.createElement('div');
        divProduto.classList.add('produto');
        divProduto.innerHTML = `
            <img class="produtomargin" src="${produto.imagem}" alt="${produto.titulo}">
            <h1 class="titulo">${produto.titulo}</h1>
            <h2 class="preco"><b>${produto.preco}</b></h2>
            <button class="comprar" data-index="${index}">Adquirir</button>
        `;
        container.appendChild(divProduto);
    });
 
    const botoesComprar = document.querySelectorAll('.comprar');
    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            adicionarProdutoNaCesta(index);
        });
    });
}
 
function adicionarProdutoNaCesta(index) {
    const produto = produtos[index];
    const produtoExistente = produtosNaCesta.find(item => item.titulo === produto.titulo);

    if (produtoExistente) {

        produtoExistente.quantidade += 1;
    } else {

        produtosNaCesta.push({ ...produto, quantidade: 1 });
    }
    atualizarListaC();

    listaC.classList.remove('escondida');
    listaC.classList.add('mostrar');
}
 
function atualizarListaC() {
    const listaC = document.querySelector('.listaC');
    const totalElement = document.getElementById('total'); 

    // Remove todos os itens existentes na lista
    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());

    let total = 0; // Inicializa o total geral

    // Adiciona os produtos atualizados na lista
    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');

        // Calcula o preço total do item (quantidade * preço unitário)
        const precoNumerico = parseFloat(produto.preco.replace(/[^\d.-]/g, ''));
        const precoTotalItem = precoNumerico * produto.quantidade;

        item.innerHTML = `
            <p><strong>${produto.titulo}</strong></p>
            <p>${produto.preco}</p>
            <p>Quantidade: ${produto.quantidade}</p>
            <p>Total: $${precoTotalItem.toFixed(2)}</p>
            <div class="botoes">
                <button class="aumentar" data-index="${index}">+</button>
                <button class="diminuir" data-index="${index}">-</button>
            </div>
        `;
        listaC.appendChild(item);

        // Adiciona o preço total do item ao total geral
        total += precoTotalItem;
    });

    // Atualiza o valor total no elemento <h2>
    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Adiciona eventos para os botões de aumentar e diminuir quantidade
    const botoesAumentar = document.querySelectorAll('.aumentar');
    botoesAumentar.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta[index].quantidade += 1;
            atualizarListaC();
        });
    });

    const botoesDiminuir = document.querySelectorAll('.diminuir');
    botoesDiminuir.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta[index].quantidade -= 1;

            // Remove o produto da cesta se a quantidade for 0
            if (produtosNaCesta[index].quantidade === 0) {
                produtosNaCesta.splice(index, 1);
            }
            atualizarListaC();
        });
    });
}
 
adicionarProdutosAoContainer();
 
function mostrarCarrinho() {
    listaC.classList.add('mostrar');
}
function esconderCarrinho() {
    listaC.classList.remove('mostrar');
}
const botaoExcluir = document.querySelector('.excluir');

botaoExcluir.addEventListener('click', () => {
    listaC.classList.remove('mostrar'); 
    listaC.classList.add('escondida'); 
});

document.addEventListener('click', (event) => {
    // Verifica se o clique foi fora do aside
    if (!listaC.contains(event.target) && !event.target.closest('.comprar')) {
        listaC.classList.remove('mostrar'); // Remove a classe que exibe o aside
        listaC.classList.add('escondida'); // Adiciona a classe que esconde o aside
    }
});

// Impede que o clique dentro do aside feche o aside
listaC.addEventListener('click', (event) => {
    event.stopPropagation(); // Impede que o clique dentro do aside seja propagado para o document
});


