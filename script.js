const produtos = [
    // Macacos
    {
        titulo: "César",
        preco: "$ 259 Bananas",
        imagem: "https://pbs.twimg.com/profile_images/1067870218456715264/XIWPNodw_400x400.jpg",
        categoria: "macacos"
    },
    {
        titulo: "Gorila",
        preco: "$ 999.99 Bananas",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DRlQ7dvuPD15NcWGHdU2qH7taprrSsIRLw&s",
        categoria: "macacos"
    },
    {
        titulo: "Le Monke",
        preco: "$ 299 Bananas",
        imagem: "https://static.wikia.nocookie.net/bbkcm/images/9/91/LeMonke.png/revision/latest?cb=20230827171036",
        categoria: "macacos"
    },
    {
        titulo: "baixo",
        preco: "$ 999 Bananas",
        imagem: "https://allthatsinteresting.com/wordpress/wp-content/uploads/2018/07/chimp-down-syndrome.jpg",
        categoria: "macacos"
    },

    // Tigres
    {
        titulo: "blanco",
        preco: "$ 90 Bananas",
        imagem: "https://pilarmmaldonado.wordpress.com/wp-content/uploads/2013/02/e0899-tigre-albino.jpg",
        categoria: "tigres"
    },
    {
        titulo: "cartinha",
        preco: "$ 20 Bananas",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTchjM_Kg-QQ_g_cD5C0Ronm-F3x50mErUAaA&s",
        categoria: "tigres"
    },
    {
        titulo: "volibear",
        preco: "$ 127 Bananas",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXIYA3uXR0Y80rHzrwBYEu8Agwv-eYOj4o8w&s",
        categoria: "tigres"
    },
    {
        titulo: "diego",
        preco: "$ 500 Bananas",
        imagem: "https://static.wikia.nocookie.net/aeradogelo/images/9/9e/Lenny_%28Ice_Age%29.jpg/revision/latest?cb=20210619100625&path-prefix=pt-br",
        categoria: "tigres"
    },

    // Onças
    {
        titulo: "tauba",
        preco: "$ 29 Bananas",
        imagem: "https://pm1.aminoapps.com/8631/cb78da692104cf02478597d1b53bcf8e655f66d3r1-1080-1054v2_hq.jpg",
        categoria: "oncas"
    },
    {
        titulo: "alisa",
        preco: "$ 999 Bananas",
        imagem: "https://pbs.twimg.com/profile_images/1728223238608621568/4fD4ln72_400x400.jpg",
        categoria: "oncas"
    },
    {
        titulo: "pintuda",
        preco: "$ 919 Bananas",
        imagem: "https://i.redd.it/gho0ll85dzhc1.jpeg",
        categoria: "oncas"
    },
    {
        titulo: "nega",
        preco: "$ 099 Bananas",
        imagem: "https://istoe.com.br/wp-content/uploads/2021/05/filhote-de-onca.jpg",
        categoria: "oncas"
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

    const itensExistentes = listaC.querySelectorAll('.item-cesta');
    itensExistentes.forEach(item => item.remove());

    let total = 0; 
    produtosNaCesta.forEach((produto, index) => {
        const item = document.createElement('div');
        item.classList.add('item-cesta');

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

        total += precoTotalItem;
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;

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
    
    if (!listaC.contains(event.target) && !event.target.closest('.comprar')) {
        listaC.classList.remove('mostrar'); 
        listaC.classList.add('escondida'); 
    }
});

listaC.addEventListener('click', (event) => {
    event.stopPropagation(); 
});

function exibirProdutosPorCategoria(categoria) {
    const nav = document.querySelector('nav');

    container.innerHTML = "";
    container.appendChild(nav); 

    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);

    produtosFiltrados.forEach((produto, index) => {
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

document.getElementById('Macacos').addEventListener('click', () => exibirProdutosPorCategoria('macacos'));
document.getElementById('Tigres').addEventListener('click', () => exibirProdutosPorCategoria('tigres'));
document.getElementById('Onças').addEventListener('click', () => exibirProdutosPorCategoria('oncas'));
document.getElementById('Todos').addEventListener('click', () => {

    const nav = document.querySelector('nav');
    container.innerHTML = "";
    container.appendChild(nav);

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
});


