import e from 'express';
import * as controller from '../controllers/sale.controller.js';

const saleRouter = e.Router();

saleRouter.get('/',controller.getAll);
saleRouter.get('/:id',controller.getSale);
saleRouter.post('/',controller.addSale);
saleRouter.delete('/:id',controller.deleteSale);
saleRouter.put('/:id',controller.updateSale);

export default saleRouter;