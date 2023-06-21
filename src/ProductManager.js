const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.currentId = 1;
  }

  addProduct(product) {
    if (!this.isProductValid(product)) {
      console.log('Invalid product data');
      return;
    }

    if (this.isCodeDuplicate(product.code)) {
      console.log('Duplicate product code');
      return;
    }

    product.id = this.currentId++;
    const products = this.getProductsFromFile();
    products.push(product);
    this.saveProductsToFile(products);
  }

  isProductValid(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
  }

  isCodeDuplicate(code) {
    const products = this.getProductsFromFile();
    return products.some(product => product.code === code);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find(product => product.id === id);
    if (product) {
      return product;
    } else {
      console.log('Product not found');
    }
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProductsToFile(products);
      console.log('Product updated successfully');
    } else {
      console.log('Product not found');
    }
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const updatedProducts = products.filter(product => product.id !== id);
    if (updatedProducts.length === products.length) {
      console.log('Product not found');
      return;
    }
    this.saveProductsToFile(updatedProducts);
    console.log('Product deleted successfully');
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.log('Error reading file:', err.message);
      return [];
    }
  }

  saveProductsToFile(products) {
    try {
      const data = JSON.stringify(products, null, 2);
      fs.writeFileSync(this.path, data);
      console.log('Products saved to file');
    } catch (err) {
      console.log('Error writing file:', err.message);
    }
  }
}

module.exports = ProductManager;