const express = require("express")
const { AppDataSource } = require("./src/config/database")
const { registrarCliente } = require("./src/controller/cliente")

const app = express()

app.use(express.json())

const { listarClientes, buscarCliente, atualizarCliente, removerCliente } = require("./src/controller/cliente")

app.post("/clientes", registrarCliente)
app.get("/clientes", listarClientes)
app.get("/clientes/:id", buscarCliente)
app.put("/clientes/:id", atualizarCliente)
app.delete("/clientes/:id", removerCliente)

app.get("/", (req, res) => {
  res.send("Olá, mundo!")
})

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected")

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  })
  .catch((error) => console.error("Error occurred: ", error))
