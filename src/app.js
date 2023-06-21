const express = require('express');
const fs = require('fs');

const ProductManager = require('./ProductManager');
const app = express();
const filePath = 'products.json';
const productManager = new ProductManager(filePath);

app.get('/products', async (req, res) => {
  const limit = req.query.limit; 
  let products = await productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit)); 
  }

  res.json(products);
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = await productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
