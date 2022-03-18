var express = require('express');
var router = express.Router();
var { Produto } = require('../models')



/* GET home page. */
router.get('/',
async (req, res, next) => {

const obj = {produtos: await Produto.findAll()}
  res.render('index', obj);
});

router.get('/sobre',
(req, res, next) => {
  res.setHeader('Set-Cookie', 'Rastreador=Biscoito')
  res.render('sobre')
})

module.exports = router;