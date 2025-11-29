import { body, param } from "express-validator";

const validateProduct = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('El nombre del producto es obligatorio')
            .bail()
            .isLength({max: 50}).withMessage('El nombre del producto no debe exceder los 50 caracteres')
            .escape(),
        body('description')
            .optional({values: 'falsy'})
            .trim()
            .notEmpty()
            .bail()
            .isLength({max: 200}).withMessage('la descripción del producto no debe exceder los 200 caracteres')
            .escape(),
        body('price')
            .trim()
            .notEmpty().withMessage('El precio del producto es requerido')
            .bail()
            .isDecimal({decimal_digits: '0,2'}).withMessage('El precio del producto debe ser un número decimal válido con hasta 2 decimales'),
        body('stock')
            .trim()
            .default(0)
            .isInt({min: 0}).withMessage('El stock del producto debe ser un número entero mayor o igual a 0')
    ]
};

const validateProductId = ()=>param('id').isInt({min:1}).withMessage('El ID es inválido');

export { validateProduct, validateProductId };