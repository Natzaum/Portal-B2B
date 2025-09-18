const { EntitySchema } = require("typeorm")

const ItensPedidos = new EntitySchema({
  name: "ItensPedidos",
  tableName: "itensPedidos",
  columns: {
    idItemPedido: { type: Number, primary: true, generated: true },
    dataPedidos: { type: "timestamp", createDate: true },
    quantidade: { type: Number, nullable: false },
    precoUnitario: { type: Number, nullable: false },
    subtotal: { type: Number, nullable: false }
  },
  relations: {
    pedido: {
      type: "many-to-one",
      target: "Pedidos",
      joinColumn: { name: "idPedido" },
      onDelete: "CASCADE"
    },
    produto: {
      type: "many-to-one",
      target: "Produto",
      joinColumn: { name: "idProduto" }
    }
  }
})

module.exports = ItensPedidos
