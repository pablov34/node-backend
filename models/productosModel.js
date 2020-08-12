const mongoose = require('../bin/mongodb')

const productosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        uppercase:true
    },
    codigo:{
        type:String,
        unique:true,
        uppercase:true,
        required:true
    },
    descripcion:String,
    precio:Number,
    categoria:{
        type:String,
        required:true
    },
})

module.exports=mongoose.model("Productos",productosSchema);