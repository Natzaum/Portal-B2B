require("reflect-metadata")
const { DataSource } = require("typeorm")
const Cliente = require("../models/cliente")
const Carrinho = require("../models/carrinho")
const Categoria = require("../models/categoria")
const ItensCarrinho = require("../models/itensCarrinho")
const ItensPedidos = require("../models/itensPedidos")
const Pedidos = require("../models/pedidos")
const Produto = require("../models/produto")
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",

  port: 3307,
  username: "nata",
  password: "12345678",
  database: "portal_b2b",
  synchronize: true,
  logging: true,
  entities: [Cliente,Carrinho,Categoria,ItensCarrinho,ItensPedidos,Pedidos,Produto],
  migrations: [],
  subscribers: [],
})

module.exports = { AppDataSource }
