import e from "express";
import saleRouter from "./sale.router.js";
import productRouter
 from "./product.router.js";
const router = e.Router();

router.use('/sales',saleRouter);
router.use('/products',productRouter);

router.get('/', (req, res) => {
  res.json({
    mensaje: 'API working OK',
    version: '1.0.0',
    endpoints: {
    }
  });
});

export default router;