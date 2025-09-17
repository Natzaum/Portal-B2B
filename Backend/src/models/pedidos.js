const { EntitySchema } = require("typeorm")

const Pedidos = new EntitySchema({
  name: "Pedidos",          
  tableName: "pedidos",  

  columns: {
    idPedido:{
        type:Number,
        primary:true,
        generated:true,
        unique:true,
        nullable:false,

    },

        
    dataPedidos:{
            type:Date,

    },

    //verificar se o pedido foi confirmado ou até enviado?
    status:{
        type:String,
    
    },
    

    //valor total do pedido efetuado
    valorTotal:{
        type:Number,

    },


  },
  relations: {
    //referenciando fk no ItemPedidios
    itemPedidosReferencia:{
      type:"one-to-many",
      target:"ItensPedidos",
      inverseSide:"pedido",
    },
    //fk id cliente
    cliente: {
      type: "many-to-one",
      target: "Cliente",
      joinColumn: { name: "idCliente" }
    },
  },

})

module.exports = Pedidos