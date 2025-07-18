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

  it('should return an empty cart initially', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toEqual([]);
  });

  it('should add an item to the cart', async () => {
    const res = await request(app)
      .post('/api/cart/add')
      .send({ product: 'Book', quantity: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body.cart).toEqual([{ product: 'Book', quantity: 2 }]);
  });

  it('should remove an item from the cart', async () => {
    await request(app).post('/api/cart/add').send({ product: 'Pen', quantity: 1 });
    const res = await request(app)
      .post('/api/cart/remove')
      .send({ product: 'Book' });
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toEqual([{ product: 'Pen', quantity: 1 }]);
  });

  it('should clear the cart', async () => {
    const res = await request(app).post('/api/cart/clear');
    expect(res.statusCode).toBe(200);
    expect(res.body.cart).toEqual([]);
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
