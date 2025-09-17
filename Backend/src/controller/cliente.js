const { AppDataSource } = require("../config/database")
const Cliente = require("../models/cliente")

async function registrarCliente(req, res) {
  try {
    const { name, email, CNPJ_CPF, telefone, endereco, senha } = req.body

    if (!name || !email || !CNPJ_CPF || !telefone || !endereco || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const clienteRepo = AppDataSource.getRepository(Cliente)

    const existente = await clienteRepo.findOne({ where: { email } })
    if (existente) {
      return res.status(400).json({ error: "E-mail já cadastrado" })
    }

    const novoCliente = clienteRepo.create({
      name,
      email,
      CNPJ_CPF,
      telefone,
      endereco,
      senha,
      ativo: true
    })

    await clienteRepo.save(novoCliente)

    return res.status(201).json({
      message: "Cliente registrado com sucesso",
      cliente: novoCliente
    })
  } catch (error) {
    console.error("Erro ao registrar cliente:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

module.exports = { registrarCliente }