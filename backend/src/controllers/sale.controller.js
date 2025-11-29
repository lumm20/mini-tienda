import { Sale, SaleDetails, Product } from "../models/index.js";
import AppError from "../utils/AppError.js";
import { checkResults } from "../middlewares/validators/checkResults.js";

const addSale = async (req, res, next) => {
    try {        
        const { totalAmount, details } = req.body;

        // Crear la venta (Cabecera)
        const newSale = await Sale.create({
            date: new Date(),
            totalAmount: totalAmount
        });

        // Crear los detalles y asociarlos
        if (details && details.length > 0) {
            for (const item of details) {
                await SaleDetails.create({
                    SaleId: newSale.id,
                    ProductId: item.productId,
                    productQuantity: item.productQuantity,
                    unitPrice: item.unitPrice,
                    subtotal: item.subtotal
                });
            }
        }

        res.status(201).json({ message: 'Venta registrada con éxito', saleId: newSale.id });
    } catch (error) {
        next(error);
    }
};

const getSale = async (req, res, next) => {
    try {
        checkResults(req);
        const { id } = req.params;
        const sale = await Sale.findByPk(id, {
            include: [{
                model: Product,
                through: { attributes: ['productQuantity', 'unitPrice', 'subtotal'] }
            }]
        });

        if (!sale) throw new AppError('Venta no encontrada', 404);

        res.status(200).json(sale);
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const sales = await Sale.findAll();
        res.status(200).json(sales);
    } catch (error) {
        next(error);
    }
};

const deleteSale = async (req, res, next) => {
    try {
        checkResults(req);
        const { id } = req.params;
        const deleted = await Sale.destroy({ where: { id } });
        if (!deleted) throw new AppError('Venta no encontrada', 404);
        res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
        next(error);
    }
};

const updateSale = async (req, res, next) => {
    res.status(501).json({ message: 'Actualización de ventas no implementada' });
};

export { addSale, getSale, getAll, deleteSale, updateSale };