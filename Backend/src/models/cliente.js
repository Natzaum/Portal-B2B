const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Cliente",
    tableName: "cliente",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true, 
        },
        name: {
            type: String,
            length: 100,
            nullable: false,
        },
        email: {
            type: String,
            length: 150,
            unique: true,
            nullable: false,
        },
        createdAt: {
            type: "timestamp",
            createDate: true, // gera automaticamente a data de criação
        },

        CNPJ_CPF:{
        type: Number,
        unique:true,
        nullable: false,
        },
        telefone:{
        type: Number,
        unique:true,
        nullable:false,
        },
        endereco:{
        type: String,
        length: 150,
        nullable:false,
        },
        senha:{
        type: String,
        length:16,
        nullable:false,
        },
        ativo:{
        type:Boolean,
        default: true,
        },

    }
});