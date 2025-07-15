import express from 'express';
import {
  getCart,
  addToCart,
  checkout,
  getProducts
} from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/checkout', checkout);
router.get('/products', getProducts); // Product listing

export default router;
