const request = require('supertest');
const app = require("../app.js")
const { sequelize } = require("../models")
const { queryInterface } = sequelize
const { hashPassword } = require("../helpers/bcrypt")

describe('Test Route POST/ login', () => {
  beforeAll((done)=>{
    return queryInterface.bulkInsert('Users',[{
      email: "abcde@gmail.com",
      password: hashPassword("abcde"),
      userName: "abcde",
      subsStatus: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{})
      .then(()=>{
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })

  afterAll((done)=>{
    return queryInterface.bulkDelete('Users')
    .then(()=>{
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  test('response(200) success login - return accessToken', (done) => {
      const dataUser = { email:"abcde@gmail.com",password: "abcde"}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(200)
          expect(body).toHaveProperty("access_token")
          done()
        })
        .catch((err)=>{
          done(err)
        })
      })
  test('response(400) failed login - Invalid Password', (done) => {
      const dataUser = { email:"abcde@gmail.com",password: "absadawqeqw"}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty("message","Password Incorrect")
          done()
        })
        .catch((err)=>{
          done(err)
        })
      })
    test('response(404) failed login - Email Not Found', (done)=>{
      const dataUser = { email:"",password: "abcde"}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty("message",'Email or Password Cannot Be empty')
          done()
        })
        .catch((err)=>{
          done(err)
        })
    })
    test('response(400) failed login - Password Incorrect', (done)=>{
      const dataUser = { email:"abcde@gmail.com",password: ""}
      request(app)
        .post('/login')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(400)
          expect(body).toHaveProperty("message",'Email or Password Cannot Be empty')
          done()
        })
        .catch((err)=>{
          done(err)
        })
    })
})


describe('Test Route POST /register', () => {
  afterAll((done)=>{
    return queryInterface.bulkDelete('Users')
    .then(()=>{
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })
  test('response(200) success register - return userData', (done) => {
    const dataUser = { email:"cxznbczxe@gmail.com",password: "abcde", username:"qwoieuqwi", subsStatus:true}
    request(app)
      .post('/register')
      .send(dataUser)
      .set('Accept', 'application/json')
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(201)
        expect(body.email).toBe(dataUser.email)
        expect(body.password).toBe(dataUser.password)
        expect(body.username).toBe(dataUser.username)
        expect(body.subsStatus).toBe(dataUser.subsStatus)
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })
  test('response(400) failed register - Email Empty', (done)=>{
    const dataUser = { email:"",password: "sakdjhajsksd",username:"iosaoisdsas",subsStatus:false}
    request(app)
      .post('/register')
      .send(dataUser)
      .set('Accept', 'application/json')
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body.message).toEqual(expect.arrayContaining(["Validation notEmpty on email failed"]))
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })
})
