const express = require('express')
const router = express.Router()
const produtos = require('../models/produto')

router.get('/',
(req, res) => {

const obj = {produtos : produtos.lista_produtos()}
    res.render('produtos', obj)
})

router.get('/:idProduto',
(req, res) =>{
    const { idProduto } = req.params
    const produto = {produto: produtos.busca_produto(idProduto)}
    res.render('detalheProduto', produto)
})

module.exports = router