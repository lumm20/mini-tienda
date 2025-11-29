import e from 'express';
import * as controller from '../controllers/sale.controller.js';
import { validateSale } from '../middlewares/validators/saleValidator.js';
import { checkResults } from '../middlewares/validators/checkResults.js';

const saleRouter = e.Router();

saleRouter.get('/', controller.getAll);
saleRouter.get('/:id', controller.getSale);
saleRouter.post('/', validateSale(), checkResults, controller.addSale);

saleRouter.delete('/:id', controller.deleteSale);
saleRouter.put('/:id', controller.updateSale);

export default saleRouter;