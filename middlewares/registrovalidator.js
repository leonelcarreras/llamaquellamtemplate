const { body } = require("express-validator")

const validations = [

    body("nombre").notEmpty().withMessage("Debe ingresar su Nombre completo"),
    body("apellido").notEmpty().withMessage("Debe ingresar su apellido"),
    body("email").notEmpty().withMessage("Debe ingresar su email").bail()
        .isEmail().withMessage("Debe ingresar en email válido"),
    body("password").notEmpty().withMessage("Debe definir una contraseña ").
        bail().isLength({ min: 8, max: 10 }).withMessage("Su contraseña debe ser de entre 8 y 10 caracteres"),

]

module.exports = validations




