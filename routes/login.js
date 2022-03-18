var express = require('express');
var router = express.Router();
var { Usuario } = require('../models')

router.get('/',
(req, res, next) => res.render('login')
)

router.post('/',
async (req, res, next) => {
  const login = await Usuario.findOne({where: {email: req.body.email}})
  if(login.usuario && login.senha == req.body.senha){
    req.session.sessaoAtiva = true
    req.session.categoria = login.categoria
    req.session.nomeUsuario = login.nome
    res.redirect('/admin')
  }else{
      res.render('erro-validacao', {mensagemErro: 'Senha inválida'})
  }
  
})


module.exports = router