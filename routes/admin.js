var express = require('express');
var router = express.Router();
var { Produto, Usuario } = require('../models')
var multer = require('multer')

const upload = multer({ dest:'public/uploads/' })

const validaAdmin = (req, res, next) => {
  if(!req.session.admin){
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
(req, res, next) => res.render('admin/criar-produto')
)

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
    await produtos.create(req.body)
    res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/remover', 
async (req, res) => {
    const {idProduto} = req.params
    await Produto.destroy({where: {id: idProduto}})
    res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/editar',
async (req, res) => {
    const {idProduto} = req.params
    const produto = {produto: await Produto.findByPk(idProduto)}
    res.render('admin/editar-produto', produto)
})

router.post('/produtos/:idProduto/editar',
valida_produto,
async (req, res) => {
    const {idProduto} = req.params
    Produto.update(req.body, { where: { id: idProduto } })
    res.redirect('/admin/produtos')
})

module.exports = router;