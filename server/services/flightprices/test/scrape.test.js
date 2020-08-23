const request = require('supertest');
const app = require("../app.js")



describe('Test Route POST /flightPrice',() => {
  test('response(200) success get Data - return flightPrices data', (done) => {
    const data = {
      dAirportCode: 'CGK',
      aAirportCode: 'DPS',
      planDate: '18-09-2020',
      psAdult: 1,
      psChild: 0,
      psInfant: 0,
      classType: 'economy',
    }
    request(app)
    .post(`/flightPrice`)
    .set('Accept', 'application/json')
    .send(data)
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(200)
      expect(body).toHaveProperty('Traveloka')
      expect(body).toHaveProperty('Tiket')
      expect(body).toHaveProperty('PegiPegi')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })

  test('response(200) get Data - return no data', (done) => {
    const data = {
      dAirportCode: 'CGK',
      aAirportCode: '',
      planDate: '18-09-2020',
      psAdult: 1,
      psChild: 0,
      psInfant: 0,
      classType: 'economy',
    }
    request(app)
    .post(`/flightPrice`)
    .set('Accept', 'application/json')
    .send(data)
    .then((response)=>{
      const { body, status } = response
      expect(status).toBe(200)
      expect(body).toHaveProperty('Traveloka')
      expect(body).toHaveProperty('Tiket')
      expect(body).toHaveProperty('PegiPegi')
      done()
    })
    .catch((err)=>{
      done(err)
    })
  })
})
