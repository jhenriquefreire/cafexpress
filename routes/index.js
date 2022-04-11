var express = require('express');
var router = express.Router();
var { Produto, Usuario } = require('../models')



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

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

router.get('/cadastro',(req,res)=>{
  res.render('cadastrar')
})


//Cambo vazio está comportando tudo como vazio. A Resolver
function valida_cadastro(req, res, next){
  // if(!req.body.nome || !req.body.email || !req.body.senha || !req.body.senhaconfirma) {
  // res.render('erro-validacao', { mensagemErro: 'Preencha todos os campos' })
  // return
  // }
  if(req.body.nome.length < 8){
    res.render('erro-validacao', { mensagemErro: 'Nome muito curto' })
    return
  }
  if(req.body.senha.length < 8){
    res.render('erro-validacao', { mensagemErro: 'Senha muito curta (mín. 8 caracteres)' })
    return
  }
  if(req.body.senha != req.body.senhaconfirma){
    res.render('erro-validacao', { mensagemErro: 'senhas devem ser iguais' })
    return
  }
  next()
}

router.post('/cadastro', valida_cadastro,
 async (req, res) =>{
  await Usuario.create(req.body)
  res.redirect('/login')
})


module.exports = router;