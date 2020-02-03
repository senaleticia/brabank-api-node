const {check, validationResult} = require('express-validator')
const usuariosValidos = require('../validators/Usuarios')

const usuarios = (app) => {
    
    app.get('/usuarios', (req, res) => {
        //const usuarios = {nome: "Letícia", senha: "123"}
        const UsuarioDAO = app.models.Usuarios;

        UsuarioDAO.lista().then(lista => {
            res.send(lista)
        }).catch(erro => {
            console.log(erro)
            res.status(500).send(erro)
        })
        //res.send(usuarios)
    }) 

    app.get('/', (req, res) => {
        res.send('Root Rote')
    })

    app.post('/usuarios', 
        usuariosValidos.validacoes(), (req, res) => {
        
        let usuario = req.body
        const erros = validationResult(req)

        if(!erros.isEmpty()){
            res.status(400).send(erros)
            return
        }

        const usuarioDAO = app.models.Usuarios
        usuarioDAO.insere(usuario).then(retorno => res.status(201).send(retorno)).catch(erro => {
            console.log(erro)
            res.status(500).send(erro)
        })
    })

    app.get('/usuarios/email/:email', (req, res) => {
        const email = req.params.email
        usuarioDAO = app.models.Usuarios

        usuarioDAO.buscarPorEmail(email)
            .then(retorno => {
                if(erro){
                    rejects('Erro ao consultar: ' + erro)
                }else{
                    const usuario = retorno[0]
                    if(usuario){
                        res.send(retorno)
                    }else{
                        res.status(404).send()
                    }
                }
            })
            res.send(retorno)
            .catch(erro => res.status(500).send(erro))
    })
}

module.exports = usuarios