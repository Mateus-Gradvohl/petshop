const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sDescricao = document.querySelector('#m-descricao');
const sEmbalagem = document.querySelector('#m-embalagem');
const sCodigoFornecedor = document.querySelector('#m-codigo-fornecedor');
const sCusto = document.querySelector('#m-custo');
const sPreco = document.querySelector('#m-preco');
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;



const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))


function listarItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
      insertItem(item, index)
    })
  
}

listarItens()


function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.index}</td>
      <td>${item.descricao}</td>
      <td>${item.embalagem}</td>
      <td>${item.preco}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
}

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    window.location.reload()
    loadItens()
}

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sDescricao.value = itens[index].descricao
      sEmbalagem.value = itens[index].embalagem
      sCodigoFornecedor.value = itens[index].codigoFornecedor
      sCusto.value = itens[index].custo
      sPreco.value = itens[index].preco
      id = index
    } else {
      sDescricao.value = ''
      sEmbalagem.value = ''
      sCodigoFornecedor.value = ''
    }
    
}

btnSalvar.onclick = e => {
  
    if (sDescricao.value == '' || sEmbalagem.value == '' || sCodigoFornecedor.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].descricao = sDescricao.value
      itens[id].embalagem = sEmbalagem.value
      itens[id].codigoFornecedor = sCodigoFornecedor.value
      itens[id].custo = sCusto.value
      itens[id].preco = sPreco.value
    } else {
      itens.push({
        'descricao': sDescricao.value, 
        'embalagem': sEmbalagem.value, 
        'codigoFornecedor': sCodigoFornecedor.value,
        'custo': sCusto,
        'preco': sPreco
      })
    }
    window.location.reload()
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
