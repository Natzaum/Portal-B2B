require("reflect-metadata")
const { DataSource } = require("typeorm")
const Cliente = require("../models/cliente")

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  
  port: 3307,
  username: "nata",
  password: "12345678",
  database: "portal_b2b",
  synchronize: true,
  logging: true,
  entities: [Cliente],
  migrations: [],
  subscribers: [],
})

module.exports = { AppDataSource }
