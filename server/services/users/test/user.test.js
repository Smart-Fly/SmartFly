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
      test('response(400) failed login - Invalid Email', (done) => {
          const dataUser = { email:"abc@gmail.com",password: "absadawqeqw"}
          request(app)
            .post('/login')
            .send(dataUser)
            .set('Accept', 'application/json')
            .then((response)=>{
              const { body, status } = response
              expect(status).toBe(400)
              expect(body).toHaveProperty("message","Email not Found")
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
  test('response(400) failed register - return error', (done) => {
    const dataUser = { email:"abcde@gmail.com",password: "abcde", username:"qwoieuqwi", subsStatus:true}
    request(app)
      .post('/register')
      .send(dataUser)
      .set('Accept', 'application/json')
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message","Email Already Exist")
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


  describe('Test Route POST /googleSignIn', () => {
    test('response(200) success register - return userData', (done) => {
      const dataUser = { idToken: "asal" }
      request(app)
        .post('/googleSignIn')
        .send(dataUser)
        .set('Accept', 'application/json')
        .then((response)=>{
          const { body, status } = response
          expect(status).toBe(500)
          done()
        })
        .catch((err)=>{
          done(err)
        })
    })
})

describe('Test Route PUT /promotion', () => {
  let access_token
  beforeAll((done)=>{
    return queryInterface.bulkInsert('Users',[{
      email: "efghi@gmail.com",
      password: hashPassword("abcde"),
      userName: "abcde",
      subsStatus: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{})
      .then(()=>{
        const dataUser = {email:'efghi@gmail.com',password:'abcde'}
        request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send(dataUser)
          .then((res) => {
            const { body, status } = res
            access_token = body.access_token
            done()
          })
          .catch((err) => {
            done(err)
          })
      })
      .catch((err)=>{
        done(err)
      })
  })
  test('response(200) success update - update promotiondata', (done) => {
    const dataUser = { subsStatus: true }
    request(app)
      .put('/promotion')
      .send(dataUser)
      .set({Accept:'application/json',access_token: access_token})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty("message",`Sucessfully update user`)
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })

  test('response(400) failed update - update promotiondata', (done) => {
    const dataUser = { subsStatus: true }
    request(app)
      .put('/promotion')
      .send(dataUser)
      .set({Accept:'application/json',access_token: 'wrong access_token'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty("message",`Token is invalid`)
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })

  test('response(400) failed update - update promotiondata', (done) => {
    const dataUser = { subsStatus: false }
    request(app)
      .put('/promotion')
      .send(dataUser)
      .set({Accept:'application/json'})
      .then((response)=>{
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty("message",`Token not found`)
        done()
      })
      .catch((err)=>{
        done(err)
      })
  })

})
