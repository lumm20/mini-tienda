import { body, param } from "express-validator";

const validateUpdateProduct = () => {
    return [
        body('id')
            .not().exists().withMessage('No puedes modificar el ID del producto'),
        body('name')
            .optional({ values: 'falsy' })
            .trim()
            .notEmpty().withMessage('El nombre no puede estar vacío')
            .bail()
            .isLength({ max: 50 }).withMessage('El nombre no debe exceder los 50 caracteres')
            .escape(),
        body('description')
            .optional({ values: 'falsy' })
            .trim()
            .notEmpty().withMessage('La descripción no puede estar vacía')
            .bail()
            .isLength({ max: 200 }).withMessage('La descripción no debe exceder los 200 caracteres')
            .escape(),
        body('price')
            .optional({ values: 'falsy' })
            .trim()
            .notEmpty().withMessage('El precio no puede venir vacío')
            .bail()
            .isDecimal({ decimal_digits: '0,2' }).withMessage('El precio debe ser un número decimal válido con hasta 2 decimales'),
        body('stock')
            .optional({ values: 'falsy' })
            .trim()
            .notEmpty().withMessage('El stock no puede venir vacío')
            .bail()
            .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0')
    ];
};

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

export { validateProduct, validateProductId, validateUpdateProduct };