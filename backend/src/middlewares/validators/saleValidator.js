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
        body('details.*.productQuantity')//valida la cantidad ingresada de cada producto en los detalles de la venta
            .custom((productQuantity, { req, pathValues }) => {
                //obtiene el indicie del producto en el array de details
                const index = Number(pathValues[0]);
                //obtiene el id del producto con el indice obtenido
                const { productId } = req.body.details[index];

                validateSaleProducts(productQuantity, productId);
            })
    ]
}


/**
 * valida si la cantidad e id del producto son validos (si son numeros enteros mayores a 0)
 * @param {*} quantity la cantidad de producto en la venta
 * @param {*} id el id del producto
 */
const validateSaleProducts= (quantity, id) =>{
    if (!quantity || !Number.isInteger(quantity) || quantity < 1) {
        throw new AppError('La cantidad de producto debe ser un número entero mayor a 0', 400);
    }

    if (!id || !Number.isInteger(id) || id < 1) {
        throw new AppError('Ingresó un ID de producto inválido', 400);
    }
}
/**
 * valida si el id ingresado en el parametro es válido (debe ser un número entero mayor a 0)
 * @returns 
 */
const validateSaleId = () => param('id').isInt({ min: 1 }).withMessage('El ID es inválido');

export { validateSaleId, validateSale };
