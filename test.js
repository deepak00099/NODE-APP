// __tests__/user.unit.test.js
const User = require('../src/models/User');
const mongoose = require('mongoose');

describe('User Model Test', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('create & save user successfully', async () => {
        const userData = { 
            username: 'testuser', 
            email: 'test@example.com', 
            password: 'password123' 
        };
        const validUser = new User(userData);
        const savedUser = await validUser.save();

        // Object Id should be defined when successfully saved to MongoDB
        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
    });

    it('insert user with required field missing', async () => {
        const userWithoutRequiredField = new User({ username: 'testuser' });
        let err;
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });
});

// __tests__/userController.integration.test.js
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');
const mongoose = require('mongoose');

describe('User Authentication', () => {
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'newuser',
                email: 'newuser@test.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login an existing user', async () => {
        // First, create a user
        await request(app)
            .post('/api/users/register')
            .send({
                username: 'loginuser',
                email: 'login@test.com',
                password: 'password123'
            });

        // Then try to log in
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'login@test.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
