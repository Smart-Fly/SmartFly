const converToNumber = require('../helpers/convertPrice')
const converDate = require('../helpers/convertDate')
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false })
const cheerio = require('cheerio')


let airline, price, airLineLogo, departureTime, arrivalTime, companyLogo, url
let dataJson = { travelAgent:"", airline: "", price: null, departureTime: "", arrivalTime: "", airLineLogo: "", companyLogo: "", url: "" }
let result = []

let getData = html => {
  const $ = cheerio.load(html)
  $('.detailOrderList').each((i, item) => {
    airline = $(item)
      .children('.firstMaskapai')
      .find('.second').text()
    dataJson.airline = airline

    airLineLogo = $(item)
      .children('.firstMaskapai')
      .find('.maskapaiLogo img').attr('src')
    airLineLogo = ('https:' + airLineLogo)

    departureTime = $(item)
      .children('.rute')
      .find('.first').first().text()
    dataJson.departureTime = departureTime

    arrivalTime = $(item)
      .children('.rute')
      .find('.first').last().text()
    dataJson.arrivalTime = arrivalTime

    let priceBig = $(item)
      .children('.priceBottom')
      .find('.price-big').text()

    let priceNormal = $(item)
      .children('.priceBottom')
      .find('.price-normal').text()

    priceBig = (priceBig.replace('.', ''))
    priceNormal = (priceNormal.replace('.', ''))
    price = (priceBig + '' + priceNormal)

    price = converToNumber(price)
    dataJson.price = price

    companyLogo = 'https://www.pegipegi.com/tiket-pesawat/sys/img/logo.svg'
    dataJson.companyLogo = companyLogo
    dataJson.url = url

    result.push({ travelAgent:"PegiPegi", airline, departureTime, arrivalTime, price, airLineLogo, companyLogo, url })

  })
}
class PegiPegi {

  static async getPegipegi(reqData) {
    let {
      dAirportCode,
      aAirportCode,
      planDate,
      psAdult,
      psChild,
      psInfant,
      classType
    } = reqData

    const NewDate = converDate(planDate, 'TL')
    url = `https://www.pegipegi.com/tiket-pesawat/sys/search-results/${dAirportCode}/${aAirportCode}/${NewDate}/${psAdult}/${psChild}/${psInfant}`
    console.log(url, '>> PegiPegi')
    try {
      await nightmare
        .goto(url)
        .wait('body')
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

module.exports = PegiPegi

