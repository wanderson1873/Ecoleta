const express = require("express")
const server = express()

// configurar pasta public
server.use(express.static("public"))


// utilizando template engie
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


// Configurar caminhos da minha aplicaçao
// Pagina inicial
// req: Resquisição
//res: Resposta
server.get("/", (req ,res) => {
    return res.render("index.html")
})

server.get("/create-point", (req ,res) => {
    return res.render("create-point.html")
})
server.get("/search", (req ,res) => {
    return res.render("search-results.html")
})

// ligar o servidor
server.listen(3000)