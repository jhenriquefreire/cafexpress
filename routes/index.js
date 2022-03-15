var express = require('express');
var router = express.Router();
var produtos = require('../models/produto')



/* GET home page. */
router.get('/',
(req, res, next) => {

const obj = {produtos: produtos.lista_produtos()}
  res.render('index', obj);
});

router.get('/sobre',
(req, res, next) => {
  res.setHeader('Set-Cookie', 'Rastreador=Biscoito')
  res.render('sobre')
})

module.exports = router;