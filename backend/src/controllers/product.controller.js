import { Product } from "../models/index.js";
import { checkResults } from "../middlewares/validators/checkResults.js";
import AppError from "../utils/AppError.js";

const addProduct = async (req, res, next) => {
    try {
        console.log('adding product');
        checkResults(req);
        const { name, description, price, stock } = req.body;
        const newProd = await Product.create({ name, description, price, stock });
        console.log(newProd);
        res.status(201).json({ message: 'created succesfully!' });
    } catch (error) {
        next(error);
    }
}

const getProduct = async (req, res, next) => {
    try {
        checkResults(req);
        const { id } = req.params;
        const prod = await Product.findByPk(id);
        console.log('product found:', prod);
        
        if (prod) return res.status(200).json(prod);
        
        throw new AppError('Product not found', 404);
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const results = await Product.findAll({});
        console.log('Products found:', results);
        res.status(200).json({ products: results });
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        checkResults(req);
        const { id } = req.params;
        const prodFound = await Product.findByPk(id);
        
        if (prodFound) {
            await Product.destroy({ where: { id: id } });
            return res.status(200).json({ message: 'Deleted succesfully!' });
        }
        throw new AppError('Product not found', 404);
    } catch (error) {
        next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        checkResults(req);
        const { id } = req.params;
        const prodData = req.body;
        
        const prodFound = await Product.findByPk(id);
        
        if (prodFound) {
            await Product.update(prodData, { where: { id: id } });
            return res.status(200).json({ message: 'Updated succesfully!' });
        }
        throw new AppError('Product not found', 404);
    } catch (error) {
        next(error);
    }
}

export { addProduct, getProduct, getAll, deleteProduct, updateProduct };