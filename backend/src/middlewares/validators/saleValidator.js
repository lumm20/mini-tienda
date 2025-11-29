import { body, param } from "express-validator";

const validateSale = () => {
    return [
        body('totalAmount')
            .exists().withMessage('El monto total es requerido')
            .isFloat({ min: 0 }).withMessage('El monto total debe ser un número positivo'),
        // Validamos que venga un array de productos (details)
        body('details')
            .exists().withMessage('Se requieren los detalles de la venta')
            .isArray({ min: 1 }).withMessage('La venta debe tener al menos un producto'),
        body('details.*.productId')
            .isInt({ min: 1 }).withMessage('ID de producto inválido'),
        body('details.*.productQuantity')
            .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
    ];
};

const validateSaleId = () => param('id').isInt({ min: 1 }).withMessage('ID de venta inválido');

export { validateSale, validateSaleId };