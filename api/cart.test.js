import request from 'supertest';
import app from '../app.js';

describe('E-Commerce API', () => {
  it('should return an empty cart initially', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toEqual([]);
  });

  it('should add a product to the cart', async () => {
    const res = await request(app)
      .post('/api/cart/add')
      .send({ product: 'Laptop', quantity: 1 });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Product added to cart');
  });

  it('should return the cart with one item', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.body.cart.length).toBe(1);
  });

  it('should checkout and empty the cart', async () => {
    const res = await request(app).post('/api/cart/checkout');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Checked out 1 item/);
  });

  it('should return an empty cart after checkout', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.body.cart).toEqual([]);
  });
});
