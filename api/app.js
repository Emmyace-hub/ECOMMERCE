import express from 'express';
import cartRoutes from './cartRoutes.js';

const app = express();

app.use(express.json());
app.use('/api/cart', cartRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Ecommerce API is running' });
});

export default app;
