const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sRaca = document.querySelector('#m-raca')
const sIdade = document.querySelector('#m-idade')
const btnSalvar = document.querySelector('#btnSalvar')

Parse.initialize("CjQzldIQHnDVpPsG13aH1hsBUKHCkACMT14DO6iV", "AttHQ7EleLv8ddEkXs2joLC8H4tWJ09o28VtKOgm");
Parse.serverURL = "https://parseapi.back4app.com/";


var parseQuery = new Parse.Query('Pet')

let itens
let id

function limparCamposModal(){
  sNome.value = ''
  sRaca.value = ''
  sIdade.value = ''
}

listarItens();

async function criarPet() {
  let novoPet = new Parse.Object('Pet');
  novoPet.set("nome", sNome.value)
  novoPet.set("idade", sIdade.value)
  novoPet.set("raca", sRaca.value)

  novoPet = await novoPet.save()
    try {
          novoPet = await novoPet.save();
          if (novoPet !== null) {
            alert(
              `Novo Pet Criado com sucesso! ObjectId: ${
                novoPet.id
              }, ${novoPet.get("nome")}`
            );
          }
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
    listarItens();
    limparCamposModal();
}



async function listarItens() {
    
  tbody.innerHTML=''
  itens = await parseQuery.find()
  if (await parseQuery.count() === 0){
    alert("Não há dados cadastrados ainda");
  } 
  else {
    try{
      itens.forEach((item, index) => {
        insertItem(item, index)
        });
    }catch (error) {
      alert(`Error: ${error.message}`);
    }
  } 
     limparCamposModal();
}

   

function insertItem(item, i) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.get('nome')}</td>
      <td>${item.get('raca')}</td>
      <td>${item.get('idade')}</td>
      <td class="acao">
        <button onclick="editItem(${i})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${i})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
}


function editItem(i) {
    openModal(true, i)
}

async function deleteItem(id) {
  let listaPets = await parseQuery.find().then()
  let pet = new Parse.Object('Pet');
  pet.set('objectId', listaPets[id].id)
    try{
      await pet.destroy();
      alert('Pet deletedo com sucesso');
        }
    catch(error){
          alert('Falha ao deletar o objeto');
      }
   listarItens();
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



btnSalvar.onclick = async e => {
  
  if (sNome.value == '' || sRaca.value == '' || sIdade.value == '') {
      return
    }
  
  e.preventDefault();
  
  if (id !== undefined) {
        let listaPets = await parseQuery.find().then()
        let pet = new Parse.Object('Pet');
        pet.set('objectId', listaPets[id].id)
        pet.set("nome", sNome.value)
        pet.set("idade", sIdade.value)
        pet.set("raca", sRaca.value)
        await pet.save();
        modal.classList.remove('active')
    } 
  else {
       criarPet();
        modal.classList.remove('active')
    }
  id = undefined
  listarItens();
}
  
