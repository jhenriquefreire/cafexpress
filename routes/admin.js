var express = require('express');
var router = express.Router();
var { Produto, Categoria, Usuario, Carrinho } = require('../models')
var multer = require('multer')

const upload = multer({ dest:'public/uploads/' })

const validaAdmin = (req, res, next) => {
  if(req.session.categoria =! 'admin'){
    res.redirect('/login')
    return
  }
  next()
}

router.use(validaAdmin)

router.get('/',
(req, res, next) => {
  const usuario = {usuario: req.session.nomeUsuario}
  res.render('admin/dashboard-admin', usuario)
})

router.get('/produtos',
async (req, res, next) => {

const obj = {produtos: await Produto.findAll()}
res.render('admin/produtos', obj)
});

router.get('/produtos/criar',
async (req, res) => {
  const categorias = await Categoria.findAll()
  
  res.render('admin/criar-produto', {categorias: categorias})
})

function valida_produto(req, res, next) {
    if(!req.body.nome || !req.body.descricao || !req.body.preco) {
      res.render('erro-validacao', { mensagemErro: 'Preencha todos os campos' })
      return
    }
    if(req.body.nome.length <= 5) {
      res.render('erro-validacao', { mensagemErro: 'Nome deve ter mais de 5 caracteres' })
      return
    }
    if(req.body.descricao.length <= 15) {
      res.render('erro-validacao', { mensagemErro: 'Descrição deve ter mais de 15 caracteres' })
      return
    }
    if(isNaN(req.body.preco)) {
      res.render('erro-validacao', { mensagemErro: 'O preço não é um número válido' })
      return
    }
    next()
  }

router.post('/produtos/criar',
upload.single('imagemProduto'),
valida_produto,
async (req, res) => {
    req.body.imagem = req.file.filename
    await Produto.create(req.body)
    res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/remover', 
async (req, res) => {
    const {idProduto} = req.params
    await Produto.destroy({where: {id: idProduto}})
    res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/carrinho', 
async (req, res) => {
    const {idProduto} = req.params
    const idUsuario = req.session.usuario.id

    await Carrinho.create(
      { produto_id: idProduto, usuario_id: idUsuario }
    )
    res.redirect('/admin/carrinho')
})

router.get('/produtos/:idProduto/carrinho/remover', 
async (req, res) => {
    const {idProduto} = req.params
    await Carrinho.destroy({where: {produto_id: idProduto}})
    res.redirect('/admin/carrinho')
})

router.get('/produtos/:idProduto/editar',
async (req, res) => {
    const {idProduto} = req.params
    const produto = {produto: await Produto.findByPk(idProduto, {
      include: {model: Categoria, as: 'categoria'}
    })}
    res.render('admin/editar-produto', produto)
})

router.post('/produtos/:idProduto/editar',
valida_produto,
async (req, res) => {
    const {idProduto} = req.params
    Produto.update(req.body, { where: { id: idProduto } })
    res.redirect('/admin/produtos')
})

router.get('/categorias', 
async (req, res) => {
  const obj = { categorias: await Categoria.findAll() }
  res.render ('admin/categorias', obj) 
})

router.get('/categorias/criar',
(req, res) => {res.render('admin/criar-categoria')})

router.get('/categorias/:idCategoria',
async (req, res) => {
  const { idCategoria } = req.params
  const obj = { categoria: await Categoria.findByPk(idCategoria, {
    include: { model: Produto, as: 'produtos' }
  }) }
  res.render ('admin/visualizar-categoria', obj)
})

router.post('/categorias/criar', async function(req, res) {
  if(req.body.nome.length <= 3) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho do nome deve ser maior do que 3 caracteres' })
    return
  }

  console.log(req.body)
  await Categoria.create(req.body)

  res.redirect('/admin/categorias')
})

router.get('/carrinho',
async (req, res) => {
  const usuario = await Usuario.findByPk(req.session.usuario.id,
      { include: { model: Produto, as: 'compra'}
      })
  res.render('admin/carrinho', {carrinho: usuario.compra})})

module.exports = router;