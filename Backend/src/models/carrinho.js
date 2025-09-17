const { EntitySchema } = require("typeorm")

const Carrinho = new EntitySchema({
  name: "Carrinho",          
  tableName: "carrinho",  

  columns: {

    idCarrinho:{
        type:Number,
        generated:true,
        unique:true,
        nullable:false,
        primary: true,


    },
 
        
    dataCriacao:{
            type:Date,

    },

    ativo:{
        type:Boolean,
        default:true,
    }
   


  },
  relations: {

    //fk cliente
    cliente: {
      type: "many-to-one",
      target: "Cliente",
      joinColumn: { name: "idCliente" }
    },
    //indicando que um item carrinho pode estar em mais de um carrinho
    itensCarrinho: {
      type: "one-to-many",
      target: "ItensCarrinho",
      inverseSide: "carrinho"
    },
   
  },

})

module.exports = Carrinho