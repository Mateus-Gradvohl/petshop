const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sRaca = document.querySelector('#m-raca')
const sIdade = document.querySelector('#m-idade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id



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
      <td>${item.nome}</td>
      <td>${item.raca}</td>
      <td>${item.idade}</td>
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
      sNome.value = itens[index].nome
      sRaca.value = itens[index].raca
      sIdade.value = itens[index].idade
      id = index
    } else {
      sNome.value = ''
      sRaca.value = ''
      sIdade.value = ''
    }
    
}

btnSalvar.onclick = e => {
  
    if (sNome.value == '' || sRaca.value == '' || sIdade.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].raca = sRaca.value
      itens[id].idade = sIdade.value
    } else {
      itens.push({'nome': sNome.value, 'raca': sRaca.value, 'idade': sIdade.value})
    }
    window.location.reload()
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
  }
