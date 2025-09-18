const { AppDataSource } = require("../config/database")
const Cliente = require("../models/cliente")

async function login(req, res) {
  try {
    const { email, senha } = req.body
    if (!email || !senha) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" })
    }

    const clienteRepo = AppDataSource.getRepository(Cliente)
    const cliente = await clienteRepo.findOne({ where: { email, senha } })

    if (!cliente) {
      return res.status(401).json({ error: "E-mail ou senha inválidos" })
    }

    return res.json({
      message: "Login realizado com sucesso",
      cliente: {
        idCliente: cliente.idCliente,
        name: cliente.name,
        email: cliente.email
      }
    })
  } catch (error) {
    console.error("Erro ao realizar login:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

module.exports = { login }
