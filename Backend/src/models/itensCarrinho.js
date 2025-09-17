const { EntitySchema, JoinColumn } = require("typeorm")

const ItensCarrinho = new EntitySchema({
  name: "ItensCarrinho",          
  tableName: "itensCarrinho",  

  columns: {

    idItemCarrinho:{
        type:Number,
        
        generated:true,
        unique:true,
        
        primary: true,
    },


    quantidade:{
        type:Number,
        nullable:false,
        
    },

    precoUnitario:{
        type:Number,
        nullable:false,

    },
  },

    relations:{

        //CRIACAO DA FK CARRINHO
        carrinho:{
            type:"many-to-one",
            target: "Carrinho",
            JoinColumn: {name: "idCarrinho"},

        },
        // fk do produto
        produto:{
            type:"many-to-one",
            target:"Produto",
            JoinColumn:{name:"idPrduto"}
        }
    },
})

module.exports = ItensCarrinho