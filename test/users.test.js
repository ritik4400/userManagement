const { expect } = require("chai");      // with real data base 
const supertest = require("supertest");
const app = require('../index');
const DB_User = require('../model/userModel');
const {  mongoose } = require("mongoose");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const {authorizeRoles ,validateToken} = require('../middleware/authMiddleware');
const {getUser , updateData ,removeData , updateProfile}  =  require('../controller/userController/userController');
const { AppError , errorHandler } = require("../middleware/errorMiddleware");


// app.use(errorHandler)
app.put( '/profile', updateProfile );
app.get('/fetchUser/:id' ,validateToken ,authorizeRoles('admin') , getUser);
app.put('/updateData/:id' ,validateToken ,authorizeRoles('admin'), updateData);
app.delete('/deleteUsers/:id' ,validateToken ,authorizeRoles('admin') , removeData)


describe( 'User API Tests (Mocked DB)' , function (){

    let jwtStub , userFindStub , userUpdatedStub , userDeleteStub  ;

    beforeEach(()=>{
        // userStub = sinon.stub(DB_User , "findById")
        jwtStub = sinon.stub(jwt , "verify").returns({id:'123' , role:'admin'});
        userFindStub = sinon.stub(DB_User , 'findById');
        userUpdatedStub = sinon.stub(DB_User , "findByIdAndUpdate");
        userDeleteStub = sinon.stub(DB_User ,"findByIdAndDelete");
    })

    afterEach( ()=>{
        sinon.restore();// Restore original methods after each test
    })

    // it('should create a new user with valid data' , async function (){
    //     const userData = { name: "John Doe", email: "john@example.com", password: "123456", tempPassword: "123456" };

    //     // Stub the `save` method so it doesn't touch the real DB
    // const saveStub = sinon.stub(DB_User.prototype, "save").resolves(userData);

    //     const res = await supertest(app).post('/api/v1/register').send(userData);

    //     expect(res.status).to.equal(201);
    //     expect(res.body).to.have.property("name", "John Doe");
    //     expect(res.body).to.have.property("email", "john@example.com");
    //     expect(res.body).to.have.property("tempPassword", "123456");

    // })

    // it("should return 400 error when required fields are missing", async function () {
    //     const res = await supertest(app).post("/api/v1/register").send({ name: "", email: "" });
    
    //     expect(res.statusCode).to.equal(400);
    //     expect(res.body).to.have.property("success", false);
    //     expect(res.body).to.have.property("message").that.includes("Name and email not found");
    //   });

    // it('should fetch a user successfully', async function (){
    //     const fakeUser = {_id:'123' , name:'john doe' , email:'john@example.com'};
    //     userFindStub.resolves(fakeUser);

    //     const res = await supertest(app)
    //     .get("/fetchUser/:id")
    //     .set("Authorization" , "Bearer valid-token");

    //     expect(res.status).to.equal(200);
    //     expect(res.body.success).to.be.true;
    //     expect(res.body.data).to.deep.equal(fakeUser);
    // })

    // it('should update a user successfully', async function(){
    //     const fakeUser = {_id:'123' , name:'john homes' , email:'john@123example.com'};
    //     userUpdatedStub.resolves(fakeUser);

    //     const res = await supertest(app)
    //     .put("/updateData/123")
    //     .set("Authorization" , "Bearer valid-token");

    //     expect(res.status).to.equal(200);
    //     expect(res.body.success).to.be.true;
    //     expect(res.body.message).to.equal("user updated")
    //     expect(res.body.data).to.deep.equal(fakeUser);
    // } )


})