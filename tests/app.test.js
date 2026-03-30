const request = require('supertest');
const app = require('../src/app');

describe('API Endpoints', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Welcome to the test API!');
  });

  test('GET /api/users should return users list', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(2);
  });

  describe('POST /api/users', () => {
    test('should create a new user when name is provided', async () => {
      const userData = { name: 'Test User' };
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(userData.name);
      expect(response.body.id).toBeDefined();
    });

    test('should return 400 when name is not provided', async () => {
      const userData = {};
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Name is required');
    });

    test('should return 400 when name is empty', async () => {
      const userData = { name: '' };
      const response = await request(app)
        .post('/api/users')
        .send(userData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Name is required');
    });
  });

  test('GET /api/health should return health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.timestamp).toBeDefined();
  });

  // TESTS PARA LOS NUEVOS ENDPOINTS DE PRODUCTOS
  describe('GET /api/products', () => {
    test('should return products list', async () => {
      const response = await request(app).get('/api/products');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(3);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0]).toHaveProperty('price');
      expect(response.body[0]).toHaveProperty('category');
    });
  });

  describe('GET /api/products/:id', () => {
    test('should return product when valid ID is provided', async () => {
      const response = await request(app).get('/api/products/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.name).toBe('Laptop');
      expect(response.body.price).toBe(999.99);
      expect(response.body.category).toBe('Electronics');
    });

    test('should return 404 when product not found', async () => {
      const response = await request(app).get('/api/products/999');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Product not found');
    });

    test('should handle invalid ID format', async () => {
      const response = await request(app).get('/api/products/abc');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Product not found');
    });
  });

  describe('POST /api/products', () => {
    test('should create a new product when all data is provided', async () => {
      const productData = {
        name: 'Test Product',
        price: 49.99,
        category: 'Test Category'
      };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe(productData.name);
      expect(response.body.price).toBe(productData.price);
      expect(response.body.category).toBe(productData.category);
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
    });

    test('should return 400 when name is not provided', async () => {
      const productData = { price: 49.99, category: 'Test' };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Product name is required');
    });

    test('should return 400 when name is empty', async () => {
      const productData = { name: '', price: 49.99, category: 'Test' };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Product name is required');
    });

    test('should return 400 when price is not provided', async () => {
      const productData = { name: 'Test Product', category: 'Test' };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Valid price is required');
    });

    test('should return 400 when price is zero or negative', async () => {
      const productData = { name: 'Test Product', price: 0, category: 'Test' };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Valid price is required');
    });

    test('should return 400 when category is not provided', async () => {
      const productData = { name: 'Test Product', price: 49.99 };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Category is required');
    });

    test('should return 400 when category is empty', async () => {
      const productData = { name: 'Test Product', price: 49.99, category: '' };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('Category is required');
    });

    test('should trim whitespace from name and category', async () => {
      const productData = {
        name: '  Test Product  ',
        price: 49.99,
        category: '  Test Category  '
      };
      const response = await request(app)
        .post('/api/products')
        .send(productData);
      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('Test Product');
      expect(response.body.category).toBe('Test Category');
    });
  });

  // TESTS PARA LOS NUEVOS ENDPOINTS DE VACACIONES
  describe('GET /api/vacaciones', () => {
    test('should return vacaciones list', async () => {
      const response = await request(app).get('/api/vacaciones');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('userId');
      expect(response.body[0]).toHaveProperty('startDate');
      expect(response.body[0]).toHaveProperty('endDate');
      expect(response.body[0]).toHaveProperty('status');
    });
  });

  describe('GET /api/vacaciones/:id', () => {
    test('should return vacacion when valid ID is provided', async () => {
      const response = await request(app).get('/api/vacaciones/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(1);
      expect(response.body.userId).toBe(1);
      expect(response.body.status).toBe('approved');
    });

    test('should return 404 when vacacion not found', async () => {
      const response = await request(app).get('/api/vacaciones/999');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Vacacion not found');
    });

    test('should handle invalid ID format', async () => {
      const response = await request(app).get('/api/vacaciones/abc');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Vacacion not found');
    });
  });

  describe('POST /api/vacaciones', () => {
    test('should create a new vacacion when all data is provided', async () => {
      const vacacionData = {
        userId: 1,
        startDate: '2024-09-01',
        endDate: '2024-09-10',
        reason: 'Rest and relaxation'
      };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(201);
      expect(response.body.userId).toBe(vacacionData.userId);
      expect(response.body.startDate).toBe(vacacionData.startDate);
      expect(response.body.endDate).toBe(vacacionData.endDate);
      expect(response.body.status).toBe('pending');
      expect(response.body.id).toBeDefined();
      expect(response.body.createdAt).toBeDefined();
    });

    test('should return 400 when userId is not provided', async () => {
      const vacacionData = { startDate: '2024-09-01', endDate: '2024-09-10' };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('userId is required');
    });

    test('should return 400 when startDate is not provided', async () => {
      const vacacionData = { userId: 1, endDate: '2024-09-10' };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('startDate is required');
    });

    test('should return 400 when endDate is not provided', async () => {
      const vacacionData = { userId: 1, startDate: '2024-09-01' };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('endDate is required');
    });

    test('should return 400 when startDate is not before endDate', async () => {
      const vacacionData = { userId: 1, startDate: '2024-09-10', endDate: '2024-09-01' };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('startDate must be before endDate');
    });

    test('should return 400 when startDate equals endDate', async () => {
      const vacacionData = { userId: 1, startDate: '2024-09-01', endDate: '2024-09-01' };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe('startDate must be before endDate');
    });

    test('should trim whitespace from startDate and endDate', async () => {
      const vacacionData = {
        userId: 1,
        startDate: '  2024-09-01  ',
        endDate: '  2024-09-10  '
      };
      const response = await request(app)
        .post('/api/vacaciones')
        .send(vacacionData);
      expect(response.statusCode).toBe(201);
      expect(response.body.startDate).toBe('2024-09-01');
      expect(response.body.endDate).toBe('2024-09-10');
    });
  });
}); 