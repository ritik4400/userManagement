const { expect } = require("chai");
const  jwt  = require("jsonwebtoken");
const express = require("express");
const sinon = require("sinon");
const supertest = require("supertest");
// const app = require('../index')
const { AppError , errorHandler } = require("../middleware/errorMiddleware");
const { validateToken ,authorizeRoles} = require('../middleware/authMiddleware');


// Create a test Express app
const app = express();
app.use(express.json());
app.use(errorHandler);//handle excepection in test on global level;



// Dummy protected route using `validateToken`
app.get('/protected' , validateToken , (req,res) =>{
    res.status(200).json({ message : "access granted" , user: req.user});
})

app.get('/admin' , validateToken , authorizeRoles('admin'), (req,res)=>{
    res.status(200).json({ message: "Admin access granted" });
})

describe( ' Auth Middleware Tests ' , function(){
    afterEach(()=>{
        sinon.restore(); // Restore mocks after each test
    })

    // it( 'should return 401 if no token is provided' , async function(){
    //     const res = await supertest(app).get('/protected');

    //     console.log("Response Body:", res.body); // Debugging: Log response

    //     expect(res.status).to.equal(401);
    //     // expect(res.body).to.have.property("success", false);
    //     expect(res.body).to.have.property("message").that.includes('Access Denied');
    // })
    // it('should return 400 if token is invalid' , async function (){
    //     const res = await supertest(app)
    //     .get('/protected')
    //     .set("Authorization" ,  "Bearer invalid-token");

    //     expect(res.status).to.equal(400);
    //     expect(res.body).to.have.property("success", false);
    //     expect(res.body).to.have.property("message").that.includes("Invalid Token");
    // })

    // it('should grant access with a valid token' , async function(){
    //     const fakeUser = {id:123 , role:'user'};

    //     // Mock `jwt.verify` to return the fake user
    //     const jwtStub =  sinon.stub(jwt , "verify").returns(fakeUser);

    //     const res = await supertest(app)
    //     .get('/protected')
    //     .set("Authorization" ,"Bearer valid-token");

    //     expect(res.status).to.equal(200);
    //     // expect(res.body).to.have.property("message" , "Access granted");
    //     expect(res.body.user).to.deep.equal(fakeUser);

    //      jwtStub.restore();
    // })

    // it("should return 403 if user role is not authorized" ,async function (){
    //     const fakeUser = { id: "123", role: "user" };

    //     // Mock `jwt.verify` to return a user with the "admin" role
    //     const jwtStub = sinon.stub(jwt , 'verify').returns(fakeUser);

    //     const res = await supertest(app)
    //     .get("/admin")
    //     .set("Authorization", "Bearer valid-token");

    //     expect(res.status).to.equal(403);
    //     expect(res.body).to.have.property("message").that.includes("Forbidden: You don’t have permission")

    //     jwtStub.restore();
    // })

    it("should grant access if user role is authorized" ,async function (){
        const fakeAdmin = {id: 123 , role : "admin"};

        // Mock `jwt.verify` to return a user with the "admin" role
        const jwtStub = sinon.stub(jwt , 'verify').returns(fakeAdmin);

        const res = await supertest(app)
        .get("/admin")
        .set("Authorization", "Bearer valid-token");

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Admin access granted");
        // expect(res.body).to.have.property("message").that.includes("")

        jwtStub.restore();
    })
   
})

