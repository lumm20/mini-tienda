import e from 'express';
import * as controller from '../controllers/product.controller.js';
import { validateProduct, validateProductId, validateUpdateProduct } from '../middlewares/validators/productValidator.js';
import { checkResults } from '../middlewares/validators/checkResults.js';

const productRouter = e.Router();

productRouter.get('/',controller.getAll);
productRouter.get('/:id',validateProductId(),checkResults, controller.getProduct);
productRouter.post('/',validateProduct(),checkResults,controller.addProduct);
productRouter.delete('/:id',validateProductId(),checkResults,controller.deleteProduct);
productRouter.put('/:id',validateProductId(), validateUpdateProduct(),checkResults,controller.updateProduct);

export default productRouter;