const { EntitySchema } = require("typeorm")

const Cliente = new EntitySchema({
  name: "Cliente",
  tableName: "cliente",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
      length: 100,
      nullable: false,
    },
    email: {
      type: String,
      length: 150,
      unique: true,
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    CNPJ_CPF: {
      type: String,
      length: 20,
      unique: true,
      nullable: false,
    },
    telefone: {
      type: String,
      length: 20,
      unique: true,
      nullable: false,
    },
    endereco: {
      type: String,
      length: 150,
      nullable: false,
    },
    senha: {
      type: String,
      length: 255,
      nullable: false,
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
})

module.exports = Cliente
