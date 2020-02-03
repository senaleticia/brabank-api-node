const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '18.206.215.59',
    port: 3306,
    user: 'leticiasena',
    password: 'bcd127',
    database: 'brabank'
})

module.exports = conexao