let cart = [];

export const getCart = (req, res) => {
  res.json({ cart });
};

export const addToCart = (req, res) => {
  const { product, quantity } = req.body;
  if (!product || !quantity) {
    return res.status(400).json({ error: 'Product and quantity are required' });
  }
  const existing = cart.find(item => item.product === product);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  res.status(201).json({ cart });
};

export const checkout = (req, res) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cart = [];
  res.status(200).json({ message: `Checked out ${totalItems} item(s)` });
};

export const getProducts = (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Phone', price: 700 },
    { id: 3, name: 'Headphones', price: 150 }
  ];
  res.status(200).json(products);
};
