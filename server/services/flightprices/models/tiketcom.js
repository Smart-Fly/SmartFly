const converToNumber = require('../helpers/convertPrice')
const converDate = require('../helpers/convertDate')
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')

let airline, price, airLineLogo, departureTime, arrivalTime, companyLogo, url, NewDate
let dataJson = { airline: "", price: null, departureTime: "", arrivalTime: "", airLineLogo: "", companyLogo:""}
let result = []

const getData = html => {
  const $ = cheerio.load(html)
  $('.wrapper-flight-list').each((i, item) => {
    airline = $(item)
      .find('.text-marketing-airline').text()
    dataJson.airline = airline

    departureTime = $(item)
      .find('.text-time').first().text()
    dataJson.departureTime = departureTime

    arrivalTime = $(item)
      .find('.text-time').last().text()
    dataJson.arrivalTime = arrivalTime

    airLineLogo = $(item)
      .find('.logo-airline img').attr('src')
    dataJson.airLineLogo = airLineLogo

    price = $(item)
      .find('.text-price').text()
    price = converToNumber(price)
    dataJson.price = price

    companyLogo = "https://www.tiket.com/pesawat/search?d=CGK&a=DPS&dType=AIRPORT&aType=AIRPORT&date=2020-08-28&adult=1&child=0&infant=1&class=economy"
    dataJson.companyLogo=companyLogo 

    result.push({ airline, departureTime, arrivalTime, price, airLineLogo, companyLogo, url })
  })
}

class TikeCom {

  static async getTiketCom(reqData) {
    let {
      dAirportCode,
      aAirportCode,
      planDate,
      psAdult,
      psChild,
      psInfant,
      classType
    } = reqData

    let dType = 'AIRPORT', aType = 'AIRPORT' //Departur and Arrival Type (CITY or AIRPORT)

    if (dAirportCode === 'JKT') {
      dAirportCode = 'JKTC'
      dType = 'CITY'
    } else if (dAirportCode === 'YKIA') {
      dAirportCode = 'JOGC'
      dType = 'CITY'
    }

    if (aAirportCode === 'JKT') {
      aAirportCode = 'JKTC'
      aType = 'CITY'
    } else if (aAirportCode === 'YKIA') {
      aAirportCode = 'JOGC'
      aType = 'CITY'
    }

    NewDate = converDate(planDate, 'TK')
    url = `https://www.tiket.com/pesawat/search?d=${dAirportCode}&a=${aAirportCode}&dType=${dType}&aType=${aType}&date=${NewDate}&adult=${psAdult}&child=${psChild}&infant=${psInfant}&class=${classType}`
    console.log(url,'>> Tiket')
    try {
      await nightmare
        .goto(url)
        .wait('body')
        .scrollTo(500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(1000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )

        .goto(url)
        .wait('body')
        .scrollTo(1500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(2000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(2500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(3000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(3500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(4000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(4500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(5000, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .goto(url)
        .wait('body')
        .scrollTo(5500, 0)
        .wait(1000)
        .evaluate(() =>
          document.querySelector('body').innerHTML
        )
        .end()
        .then((res) => {
          getData(res)
        })
        .catch((err) => {
          console.log(err)
        })

      return result
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = TikeCom




