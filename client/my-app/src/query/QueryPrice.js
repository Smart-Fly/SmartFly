import { gql } from '@apollo/client'

export const GET_FLIGHT_SEARCH = gql `
  mutation getFlight($search : FlightInput){
    getFlight(search : $search) {
        AllData {
            airline
            departureTime
            arrivalTime
            price
            airLineLogo
            companyLogo
            url
        }      
    }
  }
`;