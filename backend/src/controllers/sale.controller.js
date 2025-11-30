import { Sale, SaleDetails, Product } from "../models/index.js";
import AppError from "../utils/AppError.js";
import { findProduct } from "./product.controller.js";

/**
 * valida que todos los productos en la venta existan y tengan stock suficiente
 * @param {*} products los productos incluidos en la venta
 * @returns la lista de productos encontrados en la bd con la cantidad de cada uno
 */
const validateSaleProducts = async(products) =>{
    const productsFound=[];
    for(const item of products){
        const {productId, productQuantity} = item;
        const product = await findProduct(productId);
        if(!product) {
            throw new AppError(`El producto con ID ${productId} no existe`, 404);
        }
        if(product.stock < productQuantity) throw new AppError(`No hay suficiente cantidad del producto ${productId} en stock`,400);
        productsFound.push({productQuantity,product});
    }
    return productsFound;
}

/**
 * busca una venta por su id. Se puede especificar si se quieren obtener
 * detalles de la venta en la consulta
 * @param {*} id de la venta a buscar
 * @param {*} eager indicador de si se quieren obtener los detalles de la venta
 * @returns los datos venta encontrada
 */
const findSale = async(id, eager=true)=>{
    const sale = await Sale.findByPk(id,
        eager?
        {
            include: [
                {
                    model: Product,
                    through: { attributes: ['productQuantity', 'unitPrice', 'subtotal']}
                }
            ]
        }:null
    );
    if(sale && sale.dataValues) return sale.dataValues;
    throw new AppError('Sale not found',404);
}

// const addSale = async (req, res, next) => {
//     try {
//         const { totalAmount, details } = req.body;

//         // Crear la venta (Cabecera)
//         const newSale = await Sale.create({
//             date: new Date(),
//             totalAmount: totalAmount
//         });

//         // Crear los detalles y asociarlos
//         if (details && details.length > 0) {
//             for (const item of details) {
//                 await SaleDetails.create({
//                     SaleId: newSale.id,
//                     ProductId: item.productId,
//                     productQuantity: item.productQuantity,
//                     unitPrice: item.unitPrice,
//                     subtotal: item.subtotal
//                 });
                
//             }
//         }

//         res.status(201).json({ message: 'Venta registrada con éxito', saleId: newSale.id });
//     } catch (error) {
//         next(error);
//     }
// };

const addSale = async (req, res)=>{
    const { totalAmount, details } = req.body;
    const prodsFound= await validateSaleProducts(details);    
    const newSale = await Sale.create({date: new Date(), totalAmount});

    //recorre la lista de productos encontrados y los asocia a la venta
    //para que se registren en la tabla de union sale_details
    for(const item of prodsFound){
        const {product, productQuantity} = item;
        const {id,price}= product;
        //con esto se registran los detalles de venta en la table de union
        await newSale.addProduct(id,{through:{
            productQuantity,
            unitPrice: Number.parseFloat(price),//no se si los parseos son necesarios jejejej
            subtotal: Number.parseFloat((Number.parseFloat(price)* productQuantity).toFixed(2)),
        }});
    }
    console.log('products---',await newSale.getProducts());
    res.status(201).json({ message: 'created succesfully!' });
}

const getSale = async (req, res) =>{
    const { id } = req.params;
    const sale = await findSale(id);
    return res.status(200).json(sale);
}

const getAll = async (req,res) =>{
    const results = await Sale.findAll({});
    console.log('Sales found:',results);
    if(results.length > 0){ 
        const sales = results.map(result =>result.dataValues);
        return res.status(200).json({sales: sales})
    }
    res.status(200).json({sales:[]});
}

const deleteSale = async (req, res) =>{
    const { id } = req.params;
    const saleFound = await findSale(id, false);
    await Sale.destroy(saleFound,{where:{id:id}});
    return res.status(200).json({message:'Deleted succesfully!'});
}

const updateSale = async (req, res) =>{
    const { id } = req.params;
    const sale = req.body;
    await findSale(id);
    const updated = await Sale.update(
        sale,//todo: especificar campos a actualizar
        {where:{id:id}, returning:true});//tal vez no funcione el returning con mysql
    console.log(updated[1].at(0));
    return res.status(200).json({message:'Updated succesfully!'});
}


export { addSale, getSale, getAll, deleteSale, updateSale};
