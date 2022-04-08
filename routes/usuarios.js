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

router.get('/cadastro',(req,res)=>{
  res.render('cadastrar')
})



module.exports = router