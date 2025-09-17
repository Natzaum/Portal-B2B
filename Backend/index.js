const express = require("express")
const { AppDataSource } = require("./src/config/database")
const { registrarCliente } = require("./src/controller/cliente")

const app = express()

// Middleware para tratar JSON
app.use(express.json())

app.post("/clientes", registrarCliente)

// Rota simples
app.get("/", (req, res) => {
  res.send("Olá, mundo!")
})

// Inicializar DB e servidor
AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database Connected")

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`)
    })
  })
  .catch((error) => console.error("❌ Error occurred: ", error))
