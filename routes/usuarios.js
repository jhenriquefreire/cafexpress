var express = require('express');
var router = express.Router();
var { Produto, Categoria, Usuario, Carrinho } = require('../models')


const validaUsuario = (req, res, next) => {
    if(req.session.categoria =! 'usuario'){
      res.redirect('/login')
      return
    }
    next()
  }
  
router.use(validaUsuario)


router.get('/',(req, res, next) => {
  const usuario = {usuario: req.session.nomeUsuario}
  res.render('usuario/dashboard-usuario', usuario)
})

router.get('/produtos',
async (req, res, next) => {

const obj = {produtos: await Produto.findAll()}
res.render('usuario/produtos', obj)
});

router.get('/produtos/:idProduto/carrinho', 
async (req, res) => {
    const {idProduto} = req.params
    const idUsuario = req.session.usuario.id

    await Carrinho.create(
      { produto_id: idProduto, usuario_id: idUsuario }
    )
    res.redirect('/usuario/carrinho')
})

router.get('/produtos/:idProduto/carrinho/remover', 
async (req, res) => {
    const {idProduto} = req.params
    await Carrinho.destroy({where: {produto_id: idProduto}})
    res.redirect('/usuario/carrinho')
})

router.get('/carrinho',
async (req, res) => {
  const usuario = await Usuario.findByPk(req.session.usuario.id,
      { include: { model: Produto, as: 'compra'}
      })
  res.render('usuario/carrinho', {carrinho: usuario.compra})})

module.exports = router;
