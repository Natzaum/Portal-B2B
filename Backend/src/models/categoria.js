const { EntitySchema } = require("typeorm")

const Categoria = new EntitySchema({
  name: "Categoria",          
  tableName: "categoria",     



  columns: {

    idCategoria:{
    type:Number,
    primary:true,
    generated:true,
    unique:true,
    nullable:false,
    },

    nomeCategoria:{

        type: String,
        length: 50,

    },

    ativo:{
        type: Boolean,
        default: true,
    },

  }

})

module.exports = Categoria