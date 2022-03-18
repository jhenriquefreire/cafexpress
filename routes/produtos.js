const express = require('express')
const router = express.Router()
const { Produto } = require('../models')

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

module.exports = router