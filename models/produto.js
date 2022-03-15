const fs = require("fs")


const produtos = [
    {
        id:1,
        imagem: '',
        nome: 'Latte Médio',
        descricao: 'Latte 250ml',
        preco: 15
    },{
        id:2,
        nome: 'Cappuccino Médio',
        descricao: 'Cappucino 250ml',
        preco: 15
    },{
        id:3,
        nome: 'Blend Arábico Médio',
        descricao: 'Blend arábico 250g',
        preco: 20
    },{
        id:4,
        nome: 'Blend Robusto Médio',
        descricao: 'Blend Robusto 250g',
        preco: 20
    }


]

const { uuid } = require('uuidv4')

const lista_produtos = () => produtos

const busca_produto = id => {
    const produto = produtos.find (produto => produto.id == id)
    return produto
}

const busca_index = id => {
    const index = produtos.findIndex (produto => produto.id == id)
    return index
}

const inserir_produto = produto => {
    produto.id = uuid()
    produtos.push(produto)
}

const remover_produto = id =>{
    const id_removido = busca_index(id)
    produtos.splice(id_removido, 1)
}

const alterar_servico = (id, mudancas) => {
    const idProduto = busca_index(id)
    produtos[idProduto] = {...produtos[idProduto], ...mudancas}
}

module.exports.produtos = produtos
module.exports.lista_produtos = lista_produtos
module.exports.busca_produto = busca_produto
module.exports.inserir_produto = inserir_produto
module.exports.remover_produto = remover_produto
module.exports.alterar_servico = alterar_servico