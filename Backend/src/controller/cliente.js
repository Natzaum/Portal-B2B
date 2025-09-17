const { AppDataSource } = require("../config/database")
const Cliente = require("../models/cliente")

async function registrarCliente(req, res) {
  try {
    const { name, email, CNPJ_CPF, telefone, endereco, senha } = req.body
    if (!name || !email || !CNPJ_CPF || !telefone || !endereco || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const clienteRepo = AppDataSource.getRepository(Cliente)

    const emailExistente = await clienteRepo.findOne({ where: { email } })
    if (emailExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado" })
    }

    const docExistente = await clienteRepo.findOne({ where: { CNPJ_CPF } })
    if (docExistente) {
      return res.status(400).json({ error: "CNPJ/CPF já cadastrado" })
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

async function listarClientes(req, res) {
  try {
    const clienteRepo = AppDataSource.getRepository(Cliente)
    const clientes = await clienteRepo.find()
    return res.json(clientes)
  } catch (error) {
    console.error("Erro ao listar clientes:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function buscarCliente(req, res) {
  try {
    const id = parseInt(req.params.id)
    const clienteRepo = AppDataSource.getRepository(Cliente)
    const cliente = await clienteRepo.findOne({ where: { id } })
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" })
    return res.json(cliente)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function atualizarCliente(req, res) {
  try {
    const id = parseInt(req.params.id)
    const { name, telefone, endereco } = req.body
    const clienteRepo = AppDataSource.getRepository(Cliente)
    const cliente = await clienteRepo.findOne({ where: { id } })
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" })

    if (name) cliente.name = name
    if (telefone) cliente.telefone = telefone
    if (endereco) cliente.endereco = endereco
    cliente.updatedAt = new Date()

    await clienteRepo.save(cliente)

    return res.json({ message: "Cliente atualizado com sucesso", cliente })
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function removerCliente(req, res) {
  try {
    const id = parseInt(req.params.id)
    const clienteRepo = AppDataSource.getRepository(Cliente)
    const cliente = await clienteRepo.findOne({ where: { id } })
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" })

    await clienteRepo.remove(cliente)

    return res.json({ message: "Cliente removido com sucesso" })
  } catch (error) {
    console.error("Erro ao remover cliente:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

module.exports = {
  registrarCliente,
  listarClientes,
  buscarCliente,
  atualizarCliente,
  removerCliente
}
