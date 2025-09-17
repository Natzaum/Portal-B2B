const { AppDataSource } = require("../config/database")
const Categoria = require("../models/categoria")
const Cliente = require("../models/categoria")




async function registrarCategoria(req, res) {
    try {
      const { nomeCategoria } = req.body
      if (!nomeCategoria) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" })
      }
  
      const categoriaRepo = AppDataSource.getRepository(Categoria)
  
     
   
  
      const novaCategoria = categoriaRepo.create({
        nomeCategoria,
        ativo: true
      })
  
      await categoriaRepo.save(novaCategoria)
  
      return res.status(201).json({
        message: "Categoria registrada com sucesso",
        cliente: novaCategoria
      })
    } catch (error) {
      console.error("Erro ao registrar categoria:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
  
  async function listarCategoria(req, res) {
    try {
      const categoriaRepo = AppDataSource.getRepository(Categoria)
      const categoria = await categoriaRepo.find()
      return res.json(categoria)
    } catch (error) {
      console.error("Erro ao listar categorias:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
  
  async function buscarCategoria(req, res) {
    try {
      const id = parseInt(req.params.id)
      const categoriaRepo = AppDataSource.getRepository(Categoria)
      const categoria = await categoriaRepo.findOne({ where: { id } })
      if (!categoria) return res.status(404).json({ error: "Categoria não encontrado" })
      return res.json(categoria)
    } catch (error) {
      console.error("Erro ao buscar categoria:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
  
  async function atualizarCategoria(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { nomeCategoria} = req.body
      const categoriaRepo = AppDataSource.getRepository(Categoria)
      const categoria = await categoriaRepo.findOne({ where: { id } })
      if (!categoria) return res.status(404).json({ error: "Categoria não encontrado" })
  
      if (nomeCategoria) categoria.nomeCategoria = nomeCategoria
     
      categoria.updatedAt = new Date()
  
      await categoriaRepo.save(categoria)
  
      return res.json({ message: "Categoria atualizado com sucesso", categoria })
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
  
  async function removerCategoria(req, res) {
    try {
      const id = parseInt(req.params.id)
      const categoriaRepo = AppDataSource.getRepository(Cliente)
      const categoria = await categoriaRepo.findOne({ where: { id } })
      if (!categoria) return res.status(404).json({ error: "categoria não encontrado" })
  
      await categoriaRepo.remove(categoria)
  
      return res.json({ message: "Categoria removida com sucesso" })
    } catch (error) {
      console.error("Erro ao remover categoria:", error)
      return res.status(500).json({ error: "Erro interno do servidor" })
    }
  }
  
  module.exports = {
    registrarCategoria,
    listarCategoria,
    buscarCategoria,
    atualizarCategoria,
    removerCategoria
  }
  