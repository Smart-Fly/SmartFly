import { gql } from '@apollo/client'

export const GET_FLIGHT_SEARCH = gql `
  mutation getFlight($search : FlightInput){
    getFlight(search : $search) {
        Traveloka {
            airline
            departureTime
            arrivalTime
            price
            airLineLogo
        }
        Tiket{
            airline
            departureTime
            arrivalTime
            price
            airLineLogo
        }
        PegiPegi{
            airline
            departureTime
            arrivalTime
            price
            airLineLogo
        }
    }
  }
`;

