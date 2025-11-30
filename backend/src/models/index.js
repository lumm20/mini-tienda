import Product from "./Product.js";
import Sale from "./Sale.js";
import SaleDetails from "./SaleDetails.js";

Sale.belongsToMany(Product, {through: SaleDetails, foreignKey:'sale_id', otherKey:'product_id'});
Product.belongsToMany(Sale, {through: SaleDetails, foreignKey:'product_id', otherKey:'sale_id' });

export {Product, Sale, SaleDetails};