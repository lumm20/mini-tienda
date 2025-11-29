import { Product } from "../models";

const addProduct = async (req, res)=>{
    console.log('adding product');
    checkResults(req);
    const { prod } = req.body;
    const newProd = await Product.create(prod);
    console.log(newProd);
    res.status(201).json({ message: 'created succesfully!' });
}

const getProduct = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const prod = await Product.findByPk(id);
    console.log('product found:',prod);
    if(prod.dataValues) return res.status(200).json(prod.dataValues);
    
    throw new AppError('Product not found',404);
}

const getAll = async (req,res) =>{
    const results = await Product.findAll({});
    console.log('Products found:',results);
    if(results.length > 0){ 
        const prods = results.map(result =>result.dataValues);
        return res.status(200).json({products: prods})
    }
    throw new AppError('Products not found',404);
}

const deleteProduct = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const prodFound = await Product.findByPk(id);
    if(prodFound.dataValues) {
        const deleted = await Product.destroy(prodFound,{where:{id:id}});
        console.log(deleted);
        return res.status(200).json({message:'Deleted succesfully!'});
    }
    throw new AppError('Product not found,404');
}

const updateProduct = async (req, res) =>{
    checkResults(req);
    const { id } = req.params;
    const prod = req.body;
    const prodFound = await Product.findByPk(id);
    if(prodFound.dataValues) {
        const updated = await Product.update(
            prod,//todo: especificar campos a actualizar
            {where:{id:id}, returning:true});
            console.log(updated[1].at(0));
            return res.status(200).json({message:'Updated succesfully!'});
        }
    throw new AppError('Product not found,404');
}


export { addProduct, getProduct, getAll, deleteProduct, updateProduct};