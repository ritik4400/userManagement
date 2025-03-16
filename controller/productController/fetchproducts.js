const { AppError, errorHandler } = require("../../middleware/errorMiddleware");
const DB_Product = require('../../model/productModel');

const fetchAllproducts = async(req , res , next) =>{
    try {
        let {page = 1 , limit = 10 , sortBy = 'price' , order = 'asc' , category } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        order = order === 'asc' ? 1 : -1;

        const filter = {};

        if(category) filter.category = category;

        const product = await DB_Product.find(filter)
        .sort( { [sortBy] : order})
        .skip((page -1) * limit)
        .limit(limit);

        const totalProducts = await DB_Product.countDocuments(filter);

        res.status(200).json({
            totalProducts ,
            page ,
            limit ,
            totalPages : Math.ceil(totalProducts /  limit ),
            product,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchAllproducts
}