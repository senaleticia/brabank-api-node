const conexao = require('../config/conexao-db')

class Usuarios{

    lista(){
        return new Promise((resolve, rejects) => {
            const sql = 'SELECT * FROM usuario'

            conexao.query(sql, (erro, retorno) => {
                if(erro){
                    rejects('Erro ao consultar: ' + erro)
                    return
                }
                console.log("Consultado com SuCelso ;)")
                resolve(retorno)
            })
        })
    }

    insere(usuario){
        return new Promise((resolve, rejects) => {
            const sql = "INSERT INTO usuario SET ?"

            conexao.query(sql, usuario, (erro, retorno) => {
                erro ? rejects("Erro ao inserir: " + erro)
                    : resolve({id:retorno.insertId, ...usuario})
                
            })
        })
    }

    buscarPorEmail(email){
        return new Promise((resolve, rejects) => {
            const sql = 'SELECT * FROM usuario WHERE email = ?'

            conexao.query(sql, email, (erro, retorno) => {
                if(erro){
                    rejects('Erro ao consultar: ' + erro)
                }else{
                    const usuario = retorno[0]
                //   if(usuario){
                //       console.log('Usuário encontrado')
                        resolve(usuario)
                }    
                    console.log(retorno)
                    resolve(retorno)
            })
        })
    }
}

module.exports = new Usuarios()