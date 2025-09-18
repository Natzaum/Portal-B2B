const { EntitySchema } = require("typeorm")

const Produto = new EntitySchema({
  name: "Produto",
  tableName: "produto",
  columns: {
    idProd: { type: Number, primary: true, generated: true },
    idCategoria: { type: Number, nullable: false },
    nomeProd: { type: String, length: 100, nullable: false },
    descricao: { type: String, length: 500 },
    precoUnitario: { type: Number, nullable: false },
    quantidadeEstoque: { type: Number, nullable: false },
    ativo: { type: Boolean, default: true }
  },
  relations: {
    itensCarrinho: {
      type: "one-to-many",
      target: "ItensCarrinho",
      inverseSide: "produto"
    },
    categoria: {
      type: "many-to-one",
      target: "Categoria",
      joinColumn: { name: "idCategoria" }
    }
  }
})

module.exports = Produto
