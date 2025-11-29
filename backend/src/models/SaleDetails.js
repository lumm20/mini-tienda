import { sequelize } from "../config/db.config";
import { DataTypes } from 'sequelize';

const SaleDetails = sequelize.define('SaleDetails',{
    productQuantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    unitPrice:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00,
    },
    subtotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00,
    }
},{tableName:'sale_details',timestamps:false});

export default SaleDetails;