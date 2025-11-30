import { Product } from "../models/index.js";
import { checkResults } from "../middlewares/validators/checkResults.js";
import AppError from "../utils/AppError.js";

// const addProduct = async (req, res, next) => {
//     try {
//         console.log('adding product');
//         checkResults(req);
//         const { name, description, price, stock } = req.body;
//         const newProd = await Product.create({ name, description, price, stock });
//         console.log(newProd);
//         res.status(201).json({ message: 'created succesfully!' });
//     } catch (error) {
//         next(error);
//     }
// }
const findProduct = async (id)=>{
    const prod = await Product.findByPk(id);
    if(prod && prod.dataValues){
        console.log('product found:', prod.dataValues);
        return prod.dataValues;
    } 
    throw new AppError('Product not found',404);
}

const addProduct = async (req, res)=>{
    console.log('adding product');
    const { name, description, price, stock  } = req.body;
    const newProd = await Product.create({name, description, price, stock });
    console.log(newProd);
    res.status(201).json({ message: 'created succesfully!' });
}

const getProduct = async (req, res) =>{
    const { id } = req.params;
    const product = await findProduct(id);
    return res.status(200).json(product);
}

const getAll = async (req,res) =>{
    const results = await Product.findAll({});
    // console.log('Products found:',results);
    if(results.length > 0){ 
        const prods = results.map(result =>result.dataValues);
        return res.status(200).json({products: prods})
    }
}

const deleteProduct = async (req, res) =>{
    const { id } = req.params;
    const product = await findProduct(id);
    const deleted = await Product.destroy(product,{where:{id:id}});
    console.log(deleted);
    return res.status(200).json({message:'Deleted succesfully!'});
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const prod = req.body;
    await findProduct(id);
    const updated = await Product.update(
        prod,//todo: especificar campos a actualizar
        { where: { id: id }, returning: true });
    console.log(updated[1].at(0));
    return res.status(200).json({ message: 'Updated succesfully!' });
}

export { addProduct, getProduct, getAll, deleteProduct, updateProduct, findProduct};
