const { EntitySchema } = require("typeorm")

const Pedidos = new EntitySchema({
  name: "Pedidos",
  tableName: "pedidos",
  columns: {
    idPedido: { type: Number, primary: true, generated: true },
    dataPedidos: { type: "timestamp", createDate: true },
    status: { type: String, length: 30, default: "rascunho" },
    valorTotal: { type: Number, default: 0 }
  },
  relations: {
    itemPedidosReferencia: {
      type: "one-to-many",
      target: "ItensPedidos",
      inverseSide: "pedido"
    },
    cliente: {
      type: "many-to-one",
      target: "Cliente",
      joinColumn: { name: "idCliente" }
    }
  }
})

module.exports = Pedidos
