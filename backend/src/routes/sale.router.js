import e from 'express';
import * as controller from '../controllers/sale.controller.js';
import { validateSale, validateSaleId } from '../middlewares/validators/saleValidator.js';
import { checkResults } from '../middlewares/validators/checkResults.js';
const saleRouter = e.Router();

saleRouter.get('/',controller.getAll);
saleRouter.get('/:id',validateSaleId(),checkResults, controller.getSale);
saleRouter.post('/',validateSale(),checkResults,controller.addSale);
saleRouter.delete('/:id',validateSaleId(),checkResults,controller.deleteSale);
saleRouter.put('/:id',validateSaleId(),checkResults,controller.updateSale);

export default saleRouter;