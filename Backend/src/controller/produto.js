const { AppDataSource } = require("../config/database")
const Produto = require("../models/produto")
const Categoria = require("../models/categoria")

async function registrarProduto(req, res) {
  try {
    const { nomeProd, descricao, precoUnitario, quantidadeEstoque, idCategoria } = req.body
    if (!nomeProd || !descricao || !precoUnitario || !quantidadeEstoque || !idCategoria) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" })
    }

    const produtoRepo = AppDataSource.getRepository(Produto)

    const novoProduto = produtoRepo.create({
      nomeProd,
      descricao,
      precoUnitario,
      quantidadeEstoque,
      idCategoria,
      ativo: true
    })

    await produtoRepo.save(novoProduto)

    return res.status(201).json({
      message: "Produto registrado com sucesso",
      produto: novoProduto
    })
  } catch (error) {
    console.error("Erro ao registrar produto:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function listarProduto(req, res) {
  try {
    const produtoRepo = AppDataSource.getRepository(Produto)
    const produto = await produtoRepo.find()
    return res.json(produto)
  } catch (error) {
    console.error("Erro ao listar produto:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function buscarProduto(req, res) {
  try {
    const id = parseInt(req.params.id)
    const produtoRepo = AppDataSource.getRepository(Produto)
    const produto = await produtoRepo.findOne({ where: { id } })
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" })
    return res.json(produto)
  } catch (error) {
    console.error("Erro ao buscar produto:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function atualizarProduto(req, res) {
  try {
    const id = parseInt(req.params.id)
    const { nomeProd, descricao, precoUnit,ativo } = req.body
    const produtoRepo = AppDataSource.getRepository(Produto)
    const produto = await produtoRepo.findOne({ where: { id } })
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" })

    if (nomeProd) produto.nomeProd = nomeProd
    if (descricao) produto.descricao = descricao
    if (precoUnit) produto.precoUnitario = precoUnit
    produto.updatedAt = new Date()

    await produtoRepo.save(produto)

    return res.json({ message: "Produto atualizado com sucesso", produto })
  } catch (error) {
    console.error("Erro ao atualizar produto:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

async function removerProduto(req, res) {
  try {
    const id = parseInt(req.params.id)
    const produtoRepo = AppDataSource.getRepository(Produto)
    const produto = await produtoRepo.findOne({ where: { id } })
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" })

    await clienteRepo.remove(produto)

    return res.json({ message: "Produto removido com sucesso" })
  } catch (error) {
    console.error("Erro ao remover produto:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

module.exports = {
  registrarProduto,
  listarProduto,
  buscarProduto,
  atualizarProduto,
  removerProduto
}
