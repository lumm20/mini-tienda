import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.config.js';

const Sale = sequelize.define('Sale',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalAmount:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
},{tableName: 'sales', timestamps: false});

export default Sale;