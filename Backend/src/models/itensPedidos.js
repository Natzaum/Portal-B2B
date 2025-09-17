const { EntitySchema } = require("typeorm")

const ItensPedidos = new EntitySchema({
  name: "ItensPedidos",          
  tableName: "itensPedidos",  

  columns: {

    idItemPedido:{
        type:Number,
        generated:true,
        unique:true,
        nullable:false,
        primary: true,


    },

        
    dataPedidos:{
            type:Date,

    },


    quantidade:{
        type:Number,
        nullable:false,
    },
    precoUnitario:{
        type:Number,
        nullable:false,
    },

    subtotal:{
        type:Number,
        nullable:false,
    },


  },
  relations: {
    pedido: {
      type: "many-to-one",
      target: "Pedidos",
      joinColumn: { name: "idPedido" }
    },
    produto: {
      type: "many-to-one",
      target: "Produto",
      joinColumn: { name: "idProduto" }
    },
  },

})

module.exports = ItensPedidos