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

// Vacaciones endpoints
const vacaciones = [
  { id: 1, userId: 1, startDate: '2024-07-01', endDate: '2024-07-15', status: 'approved', reason: 'Summer vacation' },
  { id: 2, userId: 2, startDate: '2024-08-05', endDate: '2024-08-10', status: 'pending', reason: 'Family trip' }
];

app.get('/api/vacaciones', (req, res) => {
  res.json(vacaciones);
});

app.get('/api/vacaciones/:id', (req, res) => {
  const vacacionId = parseInt(req.params.id);
  const vacacion = vacaciones.find(v => v.id === vacacionId);

  if (!vacacion) {
    return res.status(404).json({ error: 'Vacacion not found' });
  }

  res.json(vacacion);
});

app.post('/api/vacaciones', (req, res) => {
  const { userId, startDate, endDate, reason } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  if (!startDate || startDate.trim() === '') {
    return res.status(400).json({ error: 'startDate is required' });
  }

  if (!endDate || endDate.trim() === '') {
    return res.status(400).json({ error: 'endDate is required' });
  }

  if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({ error: 'startDate must be before endDate' });
  }

  const newVacacion = {
    id: Date.now(),
    userId,
    startDate: startDate.trim(),
    endDate: endDate.trim(),
    status: 'pending',
    reason: reason ? reason.trim() : '',
    createdAt: new Date()
  };

  res.status(201).json(newVacacion);
});

module.exports = app; 