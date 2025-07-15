import express from 'express';
import { getCart, addToCart, checkout } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/checkout', checkout);

export default router;
