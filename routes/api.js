var express = require('express');
var router = express.Router();
const axios = require ('axios').default

router.get('/busca-cep',
async (req, res) => res.render('busca-cep'))

router.post('/busca-cep',
async (req, res) => {
    const resp = await axios.get(`https://viacep.com.br/ws/${req.body.cep}/json`)
    console.log(resp.data)
    res.render('dados-cep', resp.data)
})

module.exports = router