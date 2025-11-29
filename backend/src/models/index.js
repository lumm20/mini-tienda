import Product from "./Product.js";
import Sale from "./Sale.js";
import SaleDetails from "./SaleDetails.js";

Sale.belongsToMany(Product, {through: SaleDetails});
Product.belongsToMany(Sale, {through: SaleDetails});

export {Product, Sale, SaleDetails};