import { body, param } from "express-validator";
import AppError from "../../utils/AppError.js";

/**
 * cadena de validadores para el registro de una venta.
 * Valida el monto total y los detalles de la venta (los productos
 * incluidos, asi como la cantidad de cada uno)
 * @returns el array de validadores
 */
const validateSale = () => {
    return [
        body('totalAmount')
            .trim()//quita los espacios en blanco al inicio y al final
            .notEmpty().withMessage('El monto total de la venta es requerido')//si esta vacio
            .bail()//si falla la validacion anterior, ya no se ejecutan las demas validaciones en la cadena 
            .isDecimal({ decimal_digits: '0,2' }).withMessage('El monto total de la venta debe ser un número decimal válido con hasta 2 decimales')
            .escape(),//quita caracteres para evitar inyeccion de codigo
        body('details')
            .isArray({ min: 1 }).withMessage('La venta debe incluir al menos un producto')//si es un array con al menos un elemento
            .bail(),
        //valida el id de cada producto en los detalles de la venta
        body('details.*.productId')
            .isInt({ min: 1 }).withMessage('ID de producto inválido'),
        //valida la cantidad ingresada de cada producto en los detalles de la venta
        body('details.*.productQuantity')
            .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
    ]
}

/**
 * valida si el id ingresado en el parametro es válido (debe ser un número entero mayor a 0)
 * @returns 
 */
const validateSaleId = () => param('id').isInt({ min: 1 }).withMessage('El ID es inválido');

export { validateSaleId, validateSale };
