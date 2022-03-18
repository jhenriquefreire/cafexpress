const { Usuario } = require('./models')

const model = async () => await Usuario.create(
{
    nome: 'Maria',
    email: 'maria@outroemail.com',
    senha: 'Senha',
    categoria: 'usuario'
})

model()