const { AppDataSource } = require("../config/database")
const Pedidos = require("../models/pedidos")
const ItensPedidos = require("../models/itensPedidos")
const Produto = require("../models/produto")
const Cliente = require("../models/cliente")

// Criar um pedido (com itens)
async function registrarPedido(req, res) {
  try {
    const { idCliente, itens } = req.body
    // itens = [{ idProduto, quantidade, precoUnitario }]

    if (!idCliente || !itens || itens.length === 0) {
      return res.status(400).json({ error: "Cliente e itens são obrigatórios" })
    }

    const pedidoRepo = AppDataSource.getRepository(Pedidos)
    const itemPedidoRepo = AppDataSource.getRepository(ItensPedidos)
    const produtoRepo = AppDataSource.getRepository(Produto)

    // cria pedido base
    const novoPedido = pedidoRepo.create({
      cliente: { id: idCliente },
      dataPedidos: new Date(),
      status: "Pendente",
      valorTotal: 0
    })

    await pedidoRepo.save(novoPedido)

    let valorTotal = 0
    // percorre itens
    for (const item of itens) {
      const produto = await produtoRepo.findOne({ where: { idProd: item.idProduto } })
      if (!produto) {
        return res.status(404).json({ error: `Produto ${item.idProduto} não encontrado` })
      }

      const subtotal = item.quantidade * item.precoUnitario
      valorTotal += subtotal

      const novoItem = itemPedidoRepo.create({
        pedido: novoPedido,
        produto: produto,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
        subtotal
      })

      await itemPedidoRepo.save(novoItem)
    }

    novoPedido.valorTotal = valorTotal
    await pedidoRepo.save(novoPedido)

    return res.status(201).json({
      message: "Pedido registrado com sucesso",
      pedido: novoPedido
    })
  } catch (error) {
    console.error("Erro ao registrar pedido:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

// Listar todos os pedidos
async function listarPedidos(req, res) {
  try {
    const pedidoRepo = AppDataSource.getRepository(Pedidos)
    const pedidos = await pedidoRepo.find({ relations: ["cliente", "itemPedidosReferencia", "itemPedidosReferencia.produto"] })
    return res.json(pedidos)
  } catch (error) {
    console.error("Erro ao listar pedidos:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

// Buscar pedido por ID
async function buscarPedido(req, res) {
  try {
    const idPedido = parseInt(req.params.id)
    const pedidoRepo = AppDataSource.getRepository(Pedidos)
    const pedido = await pedidoRepo.findOne({
      where: { idPedido },
      relations: ["cliente", "itemPedidosReferencia", "itemPedidosReferencia.produto"]
    })
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" })
    return res.json(pedido)
  } catch (error) {
    console.error("Erro ao buscar pedido:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

// Atualizar status de um pedido
async function atualizarPedido(req, res) {
  try {
    const idPedido = parseInt(req.params.id)
    const { status } = req.body
    const pedidoRepo = AppDataSource.getRepository(Pedidos)
    const pedido = await pedidoRepo.findOne({ where: { idPedido } })
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" })

    if (status) pedido.status = status
    await pedidoRepo.save(pedido)

    return res.json({ message: "Pedido atualizado com sucesso", pedido })
  } catch (error) {
    console.error("Erro ao atualizar pedido:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

// Remover pedido
async function removerPedido(req, res) {
  try {
    const idPedido = parseInt(req.params.id)
    const pedidoRepo = AppDataSource.getRepository(Pedidos)
    const pedido = await pedidoRepo.findOne({ where: { idPedido } })
    if (!pedido) return res.status(404).json({ error: "Pedido não encontrado" })

    await pedidoRepo.remove(pedido)
    return res.json({ message: "Pedido removido com sucesso" })
  } catch (error) {
    console.error("Erro ao remover pedido:", error)
    return res.status(500).json({ error: "Erro interno do servidor" })
  }
}

module.exports = {
  registrarPedido,
  listarPedidos,
  buscarPedido,
  atualizarPedido,
  removerPedido
}
