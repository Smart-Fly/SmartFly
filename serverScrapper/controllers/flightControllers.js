const Traveloka = require('../models/traveloka')
const TiketCom = require('../models/tiketcom')
const PegiPegi = require('../models/pegipegi')
const saveResult = require('../helpers/saveResult')


class FlightController {

  static async getFlightData(req, res) {

    const reqeuestBody = {
      dAirportCode: req.body.dAirportCode,
      aAirportCode: req.body.aAirportCode,
      planDate: req.body.planDate,
      psAdult: req.body.psAdult,
      psChild: req.body.psChild,
      psInfant: req.body.psInfant,
      classType: req.body.classType,
    }
    
    try {

      const resTraveloka = await Traveloka.getTraveloka(reqeuestBody)
      console.log('Traveloka')

      const resTiketCom = await TiketCom.getTiketCom(reqeuestBody)
      console.log('Tiket')

      const resPegiPegi = await PegiPegi.getPegipegi(reqeuestBody)
      console.log('Pegipegi')

      const AllData = {
        Traveloka: resTraveloka,
        Tiket: resTiketCom,
        PegiPegi: resPegiPegi
      }
      res.send(AllData)
      saveResult(AllData)

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = FlightController