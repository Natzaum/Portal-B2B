const { EntitySchema } = require("typeorm")

const Carrinho = new EntitySchema({
  name: "Carrinho",
  tableName: "carrinho",
  columns: {
    idCarrinho: { type: Number, primary: true, generated: true },
    dataCriacao: { type: "timestamp", createDate: true },
    ativo: { type: Boolean, default: true }
  },
  relations: {
    cliente: {
      type: "many-to-one",
      target: "Cliente",
      joinColumn: { name: "idCliente" },
      onDelete: "CASCADE"
    },
    itensCarrinho: {
      type: "one-to-many",
      target: "ItensCarrinho",
      inverseSide: "carrinho"
    }
  }
})

module.exports = Carrinho
