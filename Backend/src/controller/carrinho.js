const { AppDataSource } = require("../config/database")
const Carrinho = require("../models/carrinho")

// Criar carrinho
async function registrarCarrinho(req, res) {
  try {
    const { idCliente } = req.body
    if (!idCliente) return res.status(400).json({ error: "Cliente é obrigatório" })

    const repo = AppDataSource.getRepository(Carrinho)
    const carrinho = repo.create({ cliente: { id: idCliente }, dataCriacao: new Date(), ativo: true })
    await repo.save(carrinho)

    return res.status(201).json({ message: "Carrinho criado", carrinho })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar carrinho" })
  }
}

// Listar
async function listarCarrinhos(req, res) {
  try {
    const repo = AppDataSource.getRepository(Carrinho)
    const carrinhos = await repo.find({ relations: ["cliente", "itensCarrinho", "itensCarrinho.produto"] })
    return res.json(carrinhos)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar carrinhos" })
  }
}

// Buscar
async function buscarCarrinho(req, res) {
  try {
    const idCarrinho = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(Carrinho)
    const carrinho = await repo.findOne({ where: { idCarrinho }, relations: ["cliente", "itensCarrinho", "itensCarrinho.produto"] })
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })
    return res.json(carrinho)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar carrinho" })
  }
}

// Atualizar (ativar/desativar)
async function atualizarCarrinho(req, res) {
  try {
    const idCarrinho = parseInt(req.params.id)
    const { ativo } = req.body
    const repo = AppDataSource.getRepository(Carrinho)
    const carrinho = await repo.findOne({ where: { idCarrinho } })
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })

    if (ativo !== undefined) carrinho.ativo = ativo
    await repo.save(carrinho)

    return res.json({ message: "Carrinho atualizado", carrinho })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar carrinho" })
  }
}

// Remover
async function removerCarrinho(req, res) {
  try {
    const idCarrinho = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(Carrinho)
    const carrinho = await repo.findOne({ where: { idCarrinho } })
    if (!carrinho) return res.status(404).json({ error: "Carrinho não encontrado" })

    await repo.remove(carrinho)
    return res.json({ message: "Carrinho removido com sucesso" })
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover carrinho" })
  }
}

module.exports = { registrarCarrinho, listarCarrinhos, buscarCarrinho, atualizarCarrinho, removerCarrinho }
