const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the test API!' });
});

// Example endpoints
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  // This is just an example response
  res.status(201).json({ id: Date.now(), name });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// NUEVO ENDPOINT SIN PRUEBA UNITARIA
app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 599.99, category: 'Electronics' },
    { id: 3, name: 'Book', price: 19.99, category: 'Education' }
  ];
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 599.99, category: 'Electronics' },
    { id: 3, name: 'Book', price: 19.99, category: 'Education' }
  ];
  
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  
  // Validaciones
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required' });
  }
  
  if (!price || price <= 0) {
    return res.status(400).json({ error: 'Valid price is required' });
  }
  
  if (!category || category.trim() === '') {
    return res.status(400).json({ error: 'Category is required' });
  }
  
  // Simular creación de producto
  const newProduct = {
    id: Date.now(),
    name: name.trim(),
    price: parseFloat(price),
    category: category.trim(),
    createdAt: new Date()
  };
  
  res.status(201).json(newProduct);
});

// Endpoint que usa ambas funciones
app.get('/api/products/stats', (req, res) => {
  const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 599.99, category: 'Electronics' },
    { id: 3, name: 'Book', price: 19.99, category: 'Education' }
  ];

  // Función CON cobertura de pruebas
  const basicStats = getBasicStats(products);
  
  // Función SIN cobertura de pruebas
  const advancedStats = getAdvancedStats(products);

  // Combinar ambos resultados
  res.json({
    ...basicStats,
    ...advancedStats
  });
});

module.exports = app; 