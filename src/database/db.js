// Importar a independemcia do slqite3
const sqlite3 = require("sqlite3").verbose()

// criando o objeto que ira fazer alterações do database

const db = new sqlite3.Database("./src/database/database.db")
module.exports = db


// ultilizar o objeto de banco de dados
db.serialize( () => {
    // 1. Criando tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        )`)

    // 2. Inserindo dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?)`

    const values = [
        "https://images.unsplash.com/photo-1507560461415-997cd00bfd45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        "Papers",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papeis e Papelão"
    ]

    function afterInsertData(err) {
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado o msucesso!!!")
        console.log(this)
    }

    //db.run(query, values, afterInsertData)

    // 3. Consultar dados da tabela

    // db.all("SELECT *FROM places", function(err, rows) {
    //    if(err) {
    //        return console.log(err)
    //    }

    //    console.log("Os dados da tabela:")
    //    console.log(rows)
    // })

    // 4. Deletar um dado da tabela

    // db.all("DELETE FROM places WHERE id = ?",[11], function(err) {
    //    if(err) {
    //        return console.log(err)
    //    }

    //    console.log("Deletado com sucesso!!!")
    // })
})

