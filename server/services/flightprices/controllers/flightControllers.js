const Traveloka = require('../models/traveloka')
const TiketCom = require('../models/tiketcom')
const PegiPegi = require('../models/pegipegi')
const saveResult = require('../helpers/saveResult')

class FlightController {

  static async getFlightData(req, res) {
    const DataTicket=[]
    const requestBody = {
      dAirportCode: req.body.dAirportCode,
      aAirportCode: req.body.aAirportCode,
      planDate: req.body.planDate,
      psAdult: req.body.psAdult,
      psChild: req.body.psChild,
      psInfant: req.body.psInfant,
      classType: req.body.classType,
    }

    try {
      const resTraveloka = await Traveloka.getTraveloka(requestBody)
      DataTicket.push(...resTraveloka)
      console.log('Traveloka')

      const resTiketCom = await TiketCom.getTiketCom(requestBody)
      DataTicket.push(...resTiketCom)
      console.log('Tiket')

      const resPegiPegi = await PegiPegi.getPegipegi(requestBody)
      DataTicket.push(...resPegiPegi)
      console.log('Pegipegi')

      // const AllData = {
      //   Traveloka: resTraveloka,
      //   Tiket: resTiketCom,
      //   PegiPegi: resPegiPegi
      // }
      // res.status(200).json(AllData)
      // saveResult(AllData)

      const result = { AllData: DataTicket }
      DataTicket.sort(function (a, b) { return a.price - b.price; });
      res.status(200).json(result)
      saveResult(result)

    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" })
    }
  }
}

module.exports = FlightController
