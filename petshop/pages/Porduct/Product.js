const descricao = document.getElementById('m-descricao');
const embalagem = document.getElementById('m-embalagem');
const codigoForenecedor = document.getElementById('m-codigo-fornecedor');
const custo = document.getElementById('m-custo');
const precoVenda = document.getElementById('m-preco-venda');
const botaoSalvar = document.getElementById('btnSalvar');
const botaoIncluit = document.getElementById('new');
const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');


Parse.initialize('CjQzldIQHnDVpPsG13aH1hsBUKHCkACMT14DO6iV','AttHQ7EleLv8ddEkXs2joLC8H4tWJ09o28VtKOgm');
Parse.serverURL = 'https://parseapi.back4app.com/';

const parseQuery = new Parse.Query('Product');

let produto;
let id;

listarProdutos();

botaoSalvar.onclick = async e => {

  if(descricao == null || embalagem == null ||codigoForenecedor == null || custo == null || precoVenda == null ) {
    return
  }
  
  e.preventDefault();

  if (id !== undefined) {
    let listaProduto = await parseQuery.find().then();
    let produto = new Parse.Object('Product');

    produto.set('objectId', listaProduto[id].id);
    produto.set('descricao', descricao.value);
    produto.set('embalagem', embalagem.value);
    produto.set('codigoFornecedor', codigoForenecedor.value);
    produto.set('custo', custo.value);
    produto.set('precoVenda', precoVenda.value);

    await produto.save();
    modal.classList.remove('active');
  }  
  else {
    adicionarProduto();
    modal.classList.remove('active');
  }

  id = undefined;
  listarProdutos();
}

async function adicionarProduto() {
  let novoProduto = new Parse.Object('Product');
  
  novoProduto.set("descricao", descricao.value);
  novoProduto.set("embalagem", embalagem.value);
  novoProduto.set("codigoFornecedor", codigoForenecedor.value);
  novoProduto.set("custo", custo.value);
  novoProduto.set("precoVenda", precoVenda.value);
  
  try {    
    
    novoProduto = await novoProduto.save();

    if(novoProduto !== null) {
      alert('Produto cadastrado com suceso!');
    }            
  } 
  catch (error) {
      alert('Erro ao cadastrar o produto: ' + error.message); 
  }

  listarProdutos()

}

async function listarProdutos() {
    tbody.innerHTML = '';
    produto = await parseQuery.find();

    try {
        produto.forEach( (item, index) => {
            let tr = document.createElement('tr');
 
            tr.innerHTML = `
            <td>${item.get('descricao')}</td>
            <td>${item.get('embalagem')}</td>
            <td>${item.get('precoVenda')}</td>
            <td class="acao">
              <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
            </td>
            <td class="acao">
              <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
            </td>
            `
            tbody.appendChild(tr);
        });
    } catch{
        alert('Não há dados a serem exibidos')
    }
}

function editItem(i) {
  openModal(true, i)
}

async function deleteItem(id) {
  let listaProduto = await parseQuery.find().then();
  let produto = new Parse.Object('Product');

  produto.set('objectId', listaProduto[id].id);

  try{
    await produto.destroy();
    alert('Porduto deletedo com sucesso');
      }
  catch(error){
        alert('Falha ao deletar o objeto');
    }
    
  listarProdutos();
}

async function openModal(edit = false, i) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
    if (edit) {
      id = i;
    }    
}