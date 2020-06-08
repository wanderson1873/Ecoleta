const express = require("express")
const server = express()

// PEgar o banco de dados
const db = require("./database/db.js")

// configurar pasta public
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended:true }))

// utilizando template engie
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos da minha aplicaçao
// Pagina inicial
// req: Resquisição
// res: Resposta
server.get("/", (req ,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req ,res) => {
    // req.query: Query String da nossa URL
    //console.log(req.query)
    return res.render("create-point.html",)
})

server.post("/savepoint", (req ,res) => {
    // req.body: o corpo do nosso formulario
    //console.log(req.body)

    // Inserir dados no banco de dados
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
            if(err){
                return console.log(err)
            }

            console.log("Cadastrado o msucesso!!!")
            console.log(this)

            return res.render("create-point.html", {saved: true})
        }

        db.run(query, values, afterInsertData)

    
})

server.get("/search", (req ,res) => {

    const search = req.query.search
    if(search == "") {
        // Pesqusa vazia
        return res.render("search-results.html", {total: 0})
    }

    //Pegar os dados do banco de dado
    db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function(err, rows) {
       if(err) {
           return console.log(err)
       }
       // Pegando quantidade de linhas do db
       const total = rows.length

       // Mostrar no HTML os dados do Banco de Dados
       return res.render("search-results.html", {places: rows, total})
    })
    
})

// ligar o servidor
server.listen(3000)