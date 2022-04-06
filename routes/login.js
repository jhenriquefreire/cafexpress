var express = require('express');
var router = express.Router();
var { Usuario } = require('../models')

router.get('/',
(req, res, next) => res.render('login')
)

router.post('/',
async (req, res, next) => {
  try {
    const login = await Usuario.findOne({where: {email: req.body.email}})
    if(login && login.senha == req.body.senha){
      req.session.sessaoAtiva = true
      req.session.categoria = login.categoria
      req.session.usuario = login
      req.session.nomeUsuario = login.nome
      if(req.session.categoria == 'admin'){
        res.redirect('/admin')
      }else if(req.session.categoria == 'usuario'){
        res.redirect('/usuarios')
      }
    }else{
        res.render('erro-validacao', {mensagemErro: 'Nome ou senha inválidos'})
    }
    }
    catch(erro){
      next(erro)
    }
  
})


module.exports = router