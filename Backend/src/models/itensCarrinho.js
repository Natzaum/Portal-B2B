const { EntitySchema } = require("typeorm")

const ItensCarrinho = new EntitySchema({
  name: "ItensCarrinho",
  tableName: "itensCarrinho",
  columns: {
    idItemCarrinho: { type: Number, primary: true, generated: true },
    quantidade: { type: Number, nullable: false },
    precoUnitario: { type: Number, nullable: false }
  },
  relations: {
    carrinho: {
      type: "many-to-one",
      target: "Carrinho",
      joinColumn: { name: "idCarrinho" },
      onDelete: "CASCADE"
    },
    produto: {
      type: "many-to-one",
      target: "Produto",
      joinColumn: { name: "idProduto" }
    }
  }
})

module.exports = ItensCarrinho
