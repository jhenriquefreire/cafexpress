var express = require('express');
var router = express.Router();
var produtos = require('../models/produto')
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
(req, res, next) => {

const obj = {produtos: produtos.lista_produtos()}
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
(req, res) => {
    req.body.imagem = req.file.filename
    produtos.inserir_produto(req.body)
    res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/remover', 
(req, res) => {
    const {idProduto} = req.params
    produtos.remover_produto(idProduto)
    res.redirect('/admin/produtos')
})

router.get('/produtos/:idProduto/editar',
(req, res) => {
    const {idProduto} = req.params
    const produto = {produto: produtos.busca_produto(idProduto)}
    res.render('admin/editar-produto', produto)
})

router.post('/produtos/:idProduto/editar',
valida_produto,
(req, res) => {
    const {idProduto} = req.params
    produtos.alterar_servico(idProduto, req.body)
    res.redirect('/admin/produtos')
})

module.exports = router;