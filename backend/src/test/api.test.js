import request from 'supertest';
import app from '../app.js';

let token;

describe('Auth API', () => {

  test('Registro de usuario devuelve 201', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: '123456'
      });

    expect([201, 409]).toContain(res.statusCode);
  });

  test('Login devuelve token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@test.com',
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

});

describe('Rutas protegidas', () => {

  test('GET /users sin token devuelve 401', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(401);
  });

  test('GET /users con token devuelve 200', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});
