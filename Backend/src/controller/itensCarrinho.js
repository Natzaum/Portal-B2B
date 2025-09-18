const { AppDataSource } = require("../config/database")
const ItensCarrinho = require("../models/itensCarrinho")
const Produto = require("../models/produto")

async function registrarItemCarrinho(req, res) {
  try {
    const { idCarrinho, idProduto, quantidade } = req.body
    if (!idCarrinho || !idProduto || !quantidade) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes" })
    }

    const produtoRepo = AppDataSource.getRepository(Produto)
    const produto = await produtoRepo.findOne({ where: { idProd: idProduto } })
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" })

    if (produto.quantidadeEstoque < quantidade) {
      return res.status(400).json({ error: "Estoque insuficiente" })
    }

    const repo = AppDataSource.getRepository(ItensCarrinho)
    const novoItem = repo.create({
      carrinho: { idCarrinho },
      produto: { idProd: idProduto },
      quantidade,
      precoUnitario: produto.precoUnitario
    })
    await repo.save(novoItem)

    produto.quantidadeEstoque -= quantidade
    await produtoRepo.save(produto)

    return res.status(201).json({ message: "Item adicionado ao carrinho", item: novoItem })
  } catch (error) {
    console.error("Erro ao adicionar item:", error)
    return res.status(500).json({ error: "Erro interno" })
  }
}

async function listarItensCarrinho(req, res) {
  try {
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const itens = await repo.find({ relations: ["carrinho", "produto"] })
    return res.json(itens)
  } catch (error) {
    console.error("Erro ao listar itens do carrinho:", error)
    return res.status(500).json({ error: "Erro ao listar itens do carrinho" })
  }
}

async function buscarItemCarrinho(req, res) {
  try {
    const idItemCarrinho = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const item = await repo.findOne({
      where: { idItemCarrinho },
      relations: ["carrinho", "produto"]
    })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })
    return res.json(item)
  } catch (error) {
    console.error("Erro ao buscar item do carrinho:", error)
    return res.status(500).json({ error: "Erro ao buscar item" })
  }
}

async function atualizarItemCarrinho(req, res) {
  try {
    const idItemCarrinho = parseInt(req.params.id)
    const { quantidade, precoUnitario } = req.body
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const item = await repo.findOne({ where: { idItemCarrinho } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    if (quantidade !== undefined) item.quantidade = quantidade
    if (precoUnitario !== undefined) item.precoUnitario = precoUnitario

    await repo.save(item)

    return res.json({ message: "Item atualizado com sucesso", item })
  } catch (error) {
    console.error("Erro ao atualizar item do carrinho:", error)
    return res.status(500).json({ error: "Erro ao atualizar item" })
  }
}

async function removerItemCarrinho(req, res) {
  try {
    const idItemCarrinho = parseInt(req.params.id)
    const repo = AppDataSource.getRepository(ItensCarrinho)
    const item = await repo.findOne({ where: { idItemCarrinho } })
    if (!item) return res.status(404).json({ error: "Item não encontrado" })

    await repo.remove(item)
    return res.json({ message: "Item removido com sucesso" })
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error)
    return res.status(500).json({ error: "Erro ao remover item" })
  }
}

module.exports = {
  registrarItemCarrinho,
  listarItensCarrinho,
  buscarItemCarrinho,
  atualizarItemCarrinho,
  removerItemCarrinho
}
