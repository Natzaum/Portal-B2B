const { EntitySchema } = require("typeorm")

const Categoria = new EntitySchema({
  name: "Categoria",
  tableName: "categoria",
  columns: {
    idCategoria: { type: Number, primary: true, generated: true },
    nomeCategoria: { type: String, length: 50, nullable: false },
    ativo: { type: Boolean, default: true }
  },
  relations: {
    produtos: {
      type: "one-to-many",
      target: "Produto",
      inverseSide: "categoria"
    }
  }
})

module.exports = Categoria
