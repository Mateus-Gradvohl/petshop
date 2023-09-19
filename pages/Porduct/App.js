var descricao = document.getElementById('m-descricao');
var embalagem = document.getElementById('m-embalagem');
var codigoForenecedor = document.getElementById('m-codigo-fornecedor');
var custo = document.getElementById('m-custo');
var precoVenda = document.getElementById('m-preco-venda');



document.getElementById('btnSalvar').onclick = () => {
    adicionarProduto();
}

async function adicionarProduto() {
    
    
    try {
        const produto = new Parse.Object('Product');

        produto.set('descricao', descricao.value);
        produto.set('embalagem', embalagem.value);
        produto.set('codigoFornecedor', codigoForenecedor.value );
        produto.set('custo', custo.value );
        produto.set('precoVenda', precoVenda.value );

        const result = await produto.save();
        alert('New object created with objectId: ' + result.id);
        window.location.reload()
    } catch (error) {
        alert('Failed to create new object: ' + error.message); 
    }
  }

