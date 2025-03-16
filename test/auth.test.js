const { expect } = require("chai");      // with real data base 
const supertest = require("supertest");
const app = require('../index');
const DB_User = require('../model/userModel');
const {  mongoose } = require("mongoose");
const sinon = require("sinon");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {AppError , errorHandler} = require('../middleware/errorMiddleware')

app.use(errorHandler)
describe( '' , function(){
    afterEach( ()=>{
        sinon.restore();// Restore original methods after each test
    })

    const fakeUser = {
        id: "12345",
    email: "test@example.com",
    password: bcrypt.hashSync("password123", 10), // Simulate a hashed password
    role: "user",
    }

    // it( 'should login successfully with correct credentials' , async function (){
    //     sinon.stub(DB_User , "findOne").resolves(fakeUser);
    //     sinon.stub(bcrypt , "compare").resolves(true);
    //     sinon.stub(jwt , "sign").returns("fake-jwt-token");

    //     const res = await supertest(app).post('/api/v1/login').send({
    //         email: "test@example.com",
    //         password: "password123",
    //     })
    //     expect(res.status).to.equal(200);
    //     expect(res.body).to.have.property("message", "Login successful");
    //     expect(res.body).to.have.property("token").that.equals("fake-jwt-token");

    // } )

    // it('should return 401 for invalid email' , async function(){
    //     sinon.stub(DB_User , "findOne").resolves(null);

    //     const res = await supertest(app).post('/api/v1/login').send({
    //         email: "wrong@example.com",
    //         password: "password123",
    //     });

    //     expect(res.status).to.equal(401);
    //     expect(res.body).to.have.property("success", false);
    //     expect(res.body).to.have.property("message").that.includes("Invalid email");
    // })

    // it('should return 400 for incorrect password' , async function (){
    //     sinon.stub(DB_User , "findOne").resolves(fakeUser);
    //     sinon.stub(bcrypt , "compare").resolves(false);

    //     const res = await supertest(app).post('/api/v1/login').send({
    //         email: "test@example.com",
    //         password: "wrongpassword",    
    //     })
    //     expect(res.status).to.equal(400);
    //     expect(res.body).to.have.property("success" , false);
    //     expect(res.body).to.have.property("message").that.includes("Invalid password")
    // })
})