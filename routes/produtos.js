const express = require('express')
const router = express.Router()
const { Produto, Carrinho } = require('../models')

router.get('/',
async (req, res) => {

const obj = {produtos : await Produto.findAll()}
    res.render('produtos', obj)
})

router.get('/:idProduto',
async (req, res) =>{
    const { idProduto } = req.params
    const produto = {produto: await Produto.findByPk(idProduto)}
    res.render('detalheProduto', produto)
})

router.get('/:idProduto/carrinho',
async(req, res) =>{
        console.log(req.session)
    if (!req.session.sessaoAtiva){
        res.render('erro-validacao', {mensagemErro: 'Login não identificado'})
    }
    else{
        const {idProduto} = req.params
        const idUsuario = req.session.usuario.id

        await Carrinho.create(
            { produto_id: idProduto, usuario_id: idUsuario }
        )
        res.redirect('/produtos')
    }
})

module.exports = router