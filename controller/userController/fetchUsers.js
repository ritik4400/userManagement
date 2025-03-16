const { AppError, errorHandler } = require("../../middleware/errorMiddleware");
const DB_Users = require("../../model/userModel");

const fetchAllUser = async (req , res ,next) =>{
    try {
        let { page = 1 , limit = 10  , sortBy = "createdAt" , order = "desc" , role} = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        order = order === "asc" ? 1 : -1;

        const filter = {};

        if(role) filter.role = role ;
        const users = await DB_Users.find(filter)
        .sort({[sortBy]:order}) //
        .skip((page -1) * limit)
        .limit(limit);

        const totalUsers = await DB_Users.countDocuments(filter);
        res.status(200).json({
            totalUsers ,
            page ,
            limit,
            totalPages :Math.ceil(totalUsers / limit),
            users,
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    fetchAllUser
}