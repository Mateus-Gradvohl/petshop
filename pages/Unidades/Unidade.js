const modal = document.querySelector('.modal-container')
const corpoTab = document.querySelector('tbody')
const endereco = document.getElementById('m-endereco')
const numero = document.getElementById('m-numero')
const bairro = document.getElementById('m-bairro')
const fone = document.getElementById('m-fone')

const btnSalvar = document.querySelector('#btnSalvar')

Parse.initialize("CjQzldIQHnDVpPsG13aH1hsBUKHCkACMT14DO6iV", "AttHQ7EleLv8ddEkXs2joLC8H4tWJ09o28VtKOgm");
Parse.serverURL = "https://parseapi.back4app.com/";


var parseQuery = new Parse.Query('Unidade')

let unidades
let id

function limparCampos(){
  endereco.value = ''
  numero.value = ''
  bairro.value = ''
  fone.value = ''
}

listarUnidades();

async function criarUnidade() {
  let novaUnidade = new Parse.Object('Unidade');
  novaUnidade.set("endereco", endereco.value)
  novaUnidade.set("numero", parseInt(numero.value))
  novaUnidade.set("bairro", bairro.value)
  novaUnidade.set("fone", fone.value)

  novaUnidade = await novaUnidade.save()
    try {
          novaUnidade = await novaUnidade.save();
          if (novaUnidade !== null) {
            alert(
              `Nova Unidade Registrada com sucesso! ObjectId: ${
                novaUnidade.id
              }, ${novaUnidade.get("endereco")}`
            );
          }
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
    listarUnidades();
    limparCampos();
}



async function listarUnidades() {
    
  corpoTab.innerHTML=''
  unidades = await parseQuery.find()
  if( await parseQuery.count() === 0){
    alert("Sem unidades cadastradas");
  }
  try{
    unidades.forEach((unidade, indice) => {
      inserirUnidade(unidade, indice)
      });
  }catch (erro) {
    alert(`Erro: ${erro.message}`);
  }
     limparCampos();
}

   

function inserirUnidade(unidade, indice) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${unidade.get('endereco')}</td>
      <td>${unidade.get('numero')}</td>
      <td>${unidade.get('bairro')}</td>
      <td>${unidade.get('fone')}</td>
      <td class="acao">
        <button onclick="editarUnidade(${indice})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deletarUnidade(${indice})"><i class='bx bx-trash'></i></button>
      </td>
    `
    corpoTab.appendChild(tr)
}


function editarUnidade(indice) {
    abrirModal(true, indice)
}

async function deletarUnidade(indice) {
  let listaUnidades = await parseQuery.find().then()
  let unidade = new Parse.Object('Unidade');
  unidade.set('objectId', listaUnidades[indice].id)
    try{
      await unidade.destroy();
      alert('Unidade deletada com sucesso');
        }
    catch(error){
          alert('Falha ao deletar a Unidade');
      }
   listarUnidades();
}

async function abrirModal(edit = false, indice) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
    if (edit) {
      id = indice;
    }    
}



btnSalvar.onclick = async e => {
  
  if (endereco.value == '' || numero.value == '' || bairro.value == ''|| fone.value == '') {
      return
    }
  
  e.preventDefault();
  
  if (id !== undefined) {
        let listaUnidades = await parseQuery.find().then()
        let unidade = new Parse.Object('Unidade');
        unidade.set('objectId', listaUnidades[id].id)
        unidade.set("endereco", endereco.value)
        unidade.set("numero", parseInt(numero.value))
        unidade.set("bairro", bairro.value)
        unidade.set("fone", fone.value)
        await unidade.save();
        modal.classList.remove('active')
    } 
  else {
       criarUnidade();
        modal.classList.remove('active')
    }
  id = undefined
  listarUnidades();
}
  
