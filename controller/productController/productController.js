const { AppError, errorHandler } = require("../../middleware/errorMiddleware");
const DB_Product = require('../../model/productModel');

const addProduct = async (req,res,next) =>{
    try {

        const {pname  , price , category , stock , ratings , tags} = req.body;

        if( !pname || !price || !category || !stock || !ratings || !tags){
            return next(new AppError('Essantial data is missing' , 400))
        }

        const newProduct = new DB_Product({
            pname  , price , category , stock , ratings , tags
        })
        await newProduct.save();
        res.status(201).json({
            success:true,
            message:'Product added successfully',
            data: newProduct
        })
        
    } catch (error) {
        next(error)
    }
} 

const getAllProducts = async (req,res,next) =>{
    try {
        const products = await DB_Product.aggregate([
            {$match  : { stock: { $gt : 0 } } } ,  // Get only in-stock products
            {$sort : {price : -1 } } , // Sort by price (desc)
            {$project : {pname : 1 , price : 1 , category: 1 , stock : 1 , ratings : 1 , _id: 0}} , 

        ]);
        res.status(200).json(products);
    } catch (error) {
        next(error)
    }
}

const getTopExpensiveProducts = async (req,res,next) =>{
    try {
        const products = await  DB_Product.aggregate([
            { $sort : {price : -1}} ,
            { $limit : 3} ,
        ])
        res.status(200).json(products);
    } catch (error) {
        next(error)
    }
}

// Get Product Details with Category Count
const getProductCategoryCount = async (req,res,next) =>{
    try {
        const result = await DB_Product.aggregate([
            { $group : {_id: " $category" , totalProducts: {$sum: 1}  }} ,
            {$sort : {totalProducts : -1}}
        ]);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

const getProductsByCategory = async (req,res,next) =>{
    try {

        const { category } = req.params;

        const product = await DB_Product.aggregate([
            {$match :{ category } },
            {$sort : {price : -1}} ,
        ])
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}

const getHighratedProduct = async(req,res,next) =>{
    try {
        const product = await DB_Product.aggregate([
            {$match: {ratings :{ $gte : 4 } } },
            {$sort : {rating : -1}}
        ]);
        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
}



module.exports = {
    addProduct ,
    getAllProducts, 
    getTopExpensiveProducts ,
    getProductCategoryCount ,
    getProductsByCategory , 
    getHighratedProduct
}