
const produtos = [
    {
        titulo: "César",
        preco: "$ 259,99 Bananas",
        imagem: "https://pbs.twimg.com/profile_images/1067870218456715264/XIWPNodw_400x400.jpg"
    },
    {
        titulo: "Gorila",
        preco: "$ 999,99 Bananas",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DRlQ7dvuPD15NcWGHdU2qH7taprrSsIRLw&s"
    },
    {
        titulo: "Le Monke",
        preco: "R$ 299,00 Bananas",
        imagem: "https://static.wikia.nocookie.net/bbkcm/images/9/91/LeMonke.png/revision/latest?cb=20230827171036"
    },
    {
        titulo: "Assembleia Macacal",
        preco: "$ 9999999 Bananas",
        imagem: "https://media.revide.com.br/cache/74/97/7497fce570a4f03d95cca60533936a6c.jpg" 
    }
];
const produtosNaCesta = [];
 
const container = document.getElementById('container');
 
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
    produtosNaCesta.push(produto);
    atualizarListaC();
}
 
function atualizarListaC() {
    const listaC = document.querySelector('.listaC');
 
    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());
 
    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');
        item.innerHTML = `
            <p><strong>${produto.titulo}</strong></p>
            <p>${produto.preco}</p>
            <button class="remover" data-index="${index}">Remover</button>
        `;
        listaC.appendChild(item);
    });

    const botoesRemover = document.querySelectorAll('.remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            produtosNaCesta.splice(index, 1); 
            atualizarListaC(); 
        });
    });
}
 
adicionarProdutosAoContainer();
 
