const productosModel = require("../models/productosModel")

module.exports={
    getAll: async function(req, res, next) {
        console.log(req.query)
        console.log("UserToken",req.body.userToken)
        try{
            let productos = await productosModel.find({})

            res.json(productos)
        }catch(e){
            next(e)
        }
        
        
    },
    getById: async function(req, res, next) {
        console.log(req.params)
        
        try{
            let productos = await productosModel.findById(req.params.id)

            res.json(productos)
        }catch(e){
            next(e)
        }
    },
    create: async function(req,res,next){
        console.log(req.body)
        try{
            let producto = new productosModel({
                nombre:req.body.nombre,
                codigo:req.body.codigo,
                descripcion:req.body.descripcion,
                precio:req.body.precio,
                categoria:req.body.categoria
            })
            let documento = await producto.save()
            res.json(documento)
        }catch(e)
        {
            next(e)
        }
        
    },
    update:async function(req,res,next){
        try
        {
            let producto = await productosModel.update({_id:req.params.id},req.body,{multi:false})
            res.json(producto)
        }catch(e)
        {
            next(e)
        }
    },
    delete:async function(req,res,next){
        try
        {
            let productoeliminado = await productosModel.deleteOne({_id:req.params.id})
            res.json(productoeliminado)
        }
        catch(e)
        {
            next(e)
        }
    }
}