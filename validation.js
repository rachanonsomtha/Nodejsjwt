//validation!
const Joi = require('@hapi/joi');

// register validation
const registerValdation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    //validate the data
    return schema.validate(data);
};

// login validation
const loginValdation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    //validate the data
    const validation = schema.validate(data)

    return validation;

};
module.exports = {
    registerValdation,
    loginValdation
}