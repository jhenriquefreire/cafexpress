const usuarios = [{
    email: 'joao@email.com',
    senha:'Descubra',
    nome: 'João',
    admin: true
}]

const busca_usuario = email => {
    const usuario = usuarios.find(item => item.email == email)
    return usuario
}


module.exports.busca_usuario = busca_usuario