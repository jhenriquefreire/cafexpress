var express = require('express');
var router = express.Router();
var usuarios = require('../models/usuario')

router.get('/',
(req, res, next) => res.render('login')
)

router.post('/',
(req, res, next) => {
  const login = usuarios.busca_usuario(req.body.email)
  if(login.senha == req.body.senha){
    req.session.sessaoAtiva = true
    req.session.admin = login.admin
    req.session.nomeUsuario = login.nome
    res.redirect('/admin')
  }else{
      res.render('erro-validacao', {mensagemErro: 'Senha inválida'})
  }
  res.render ('login')
})


module.exports = router