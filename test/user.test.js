// const { expect } = require("chai");      // with real data base 
// const supertest = require("supertest");
// const app = require('../index');
// const DB_User = require('../model/userModel');
// const {  mongoose } = require("mongoose");
// const { AppError, errorHandler } = require("../middleware/errorMiddleware");
// describe('user Apis test' , function(){
//     before(async function(){
//         await mongoose.connect(process.env.MONGO_URI);
//     });

//     // afterEach(async function(){
//     //     await DB_User.deleteMany({});
//     // });

//     after(async function () {
//         // Close DB connection after tests
//         await mongoose.connection.close();
//       });

    // it('should create a new user with valid data' , async function(){
    //     const userData = {name : 'Rajesh' , email : 'rajesh@gmail.com' , password : '123456'};

    //     const res = await supertest(app).post('/api/v1/register').send(userData);

    //     expect(res.status).to.equal(201);
    //     expect(res.body).to.have.property("name", "Rajesh");
    //     expect(res.body).to.have.property("email", "rajesh@gmail.com");
    //     expect(res.body).to.have.property("tempPassword", "123456");
    // })
    // it("should return 400 error when required fields are missing", async function () {
    //     const res = await supertest(app).post("/api/v1/register").send({ name: "", email: "" });
    
    //     expect(res.statusCode).to.equal(400);
    //     expect(res.body).to.have.property("success", false);
    //     expect(res.body).to.have.property("message").that.includes("Name and email not found");
    //   });

    
// })
