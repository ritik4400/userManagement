const Joi = require('joi')

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const userIdSchema = Joi.object({
   id: Joi.string().alphanum().length(24).required(),
})

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email:Joi.string().email().optional(),
})

const updateProfileSchema =  Joi.object({
    id: Joi.string().alphanum().length(24).required(),
    name: Joi.string().min(3).max(30).optional(),
    email:Joi.string().email().optional(),
})


module.exports =  {userSchema,
    userIdSchema ,
    updateUserSchema,
    updateProfileSchema
 } ;