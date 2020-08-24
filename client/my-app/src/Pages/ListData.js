import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardResult from '../components/CardResult'
import { useParams, useLocation } from 'react-router-dom'
import { GET_FLIGHT_SEARCH } from '../query/QueryPrice'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import './list.css'
import LinearProgress from '@material-ui/core/LinearProgress'
import Skeleton from '@material-ui/lab/Skeleton';


const GET_PRED = gql `
	query getPrediction($depart: String, $arrive: String) {
		predictions(departure: $depart, arrival: $arrive) {
			accuracy
			slopeGraph
      intercept
		}
	}
`


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));
const ListData = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { slug } = useParams()
    const { state: { data } } = useLocation()
    const [getFlight, { data: ticket, loading }] = useMutation(GET_FLIGHT_SEARCH)
    const [getPredictions, { loading: loadingPredictions, data: dataPredictions }] = useLazyQuery(GET_PRED,{
      variables:{
        depart: data.dAirportCode,
        arrive: data.aAirportCode
      }
    });

    const getPredict = () => {
      console.log(data.dAirportCode)
      console.log(data.aAirportCode)
      getPredictions()
      if(dataPredictions){
        console.log(dataPredictions)
      }
      else{
        console.log(loadingPredictions)
      }
    }

    useEffect(() => {
        getFlight({
            variables: {
                search: {
                    dAirportCode: data.dAirportCode,
                    aAirportCode: data.aAirportCode,
                    planDate: data.planDate,
                    psAdult: data.psAdult,
                    psChild: data.psChild,
                    psInfant: data.psInfant,
                    classType: data.classType
                }
            }
        })
    }, [slug, data, getFlight])

    if (loading) {
        return (
            <>

                        <LinearProgress color="secondary" />
                        <Container  className="mt-5 pt-2">
                        <br></br>
                        <Skeleton variant="rect" width={1100} height={120} />
                        <br></br>
                        <Skeleton variant="rect" width={1100} height={120} />
                        <br></br>
                        <Skeleton variant="rect" width={1100} height={120} />
                        <br></br>
                        <Skeleton variant="rect" width={1100} height={120} />
                        </Container>
            </>
        )
    }
    if (ticket) {
        console.log(ticket.getFlight)
    }
    let dummy = [
        {
            "airline": "Lion Air",
            "departureTime": "18:30",
            "arrivalTime": "21:20",
            "price": 624600,
            "airLineLogo": "https://static.tiket.photos/image/upload/v1534836616/string/2018/08/21/77df219f-f1d2-494b-a5e7-a339a30e68dd36101a6e250cd0c3b727098ef19b62c6.png"
        },
        {
            "airline": "Lion Air",
            "departureTime": "07:00",
            "arrivalTime": "12:50",
            "price": 685700,
            "airLineLogo": "https://static.tiket.photos/image/upload/v1534836616/string/2018/08/21/77df219f-f1d2-494b-a5e7-a339a30e68dd36101a6e250cd0c3b727098ef19b62c6.png"
        },
        {
            "airline": "Lion Air",
            "departureTime": "05:00",
            "arrivalTime": "10:20",
            "price": 739600,
            "airLineLogo": "https://static.tiket.photos/image/upload/v1534836616/string/2018/08/21/77df219f-f1d2-494b-a5e7-a339a30e68dd36101a6e250cd0c3b727098ef19b62c6.png"
        },
        {
            "airline": "Lion Air",
            "departureTime": "05:00",
            "arrivalTime": "12:50",
            "price": 739600,
            "airLineLogo": "https://static.tiket.photos/image/upload/v1534836616/string/2018/08/21/77df219f-f1d2-494b-a5e7-a339a30e68dd36101a6e250cd0c3b727098ef19b62c6.png"
        },
        {
            "airline": "Batik Air",
            "departureTime": "15:40",
            "arrivalTime": "18:30",
            "price": 798400,
            "airLineLogo": "https://static.tiket.photos/image/upload/v1534831998/string/2018/08/21/ed396405-de36-47de-bb63-a77ede31b440496ffdd3b1650405cea0fe5d6ca8b5c6.png"
        },
        {
            "airline": "Batik Air",
            "departureTime": "17:00",
            "arrivalTime": "19:50",
            "price": 798400,
            "airLineLogo": "https://static.tiket.photos/image/upload/v1534831998/string/2018/08/21/ed396405-de36-47de-bb63-a77ede31b440496ffdd3b1650405cea0fe5d6ca8b5c6.png"
        },]
    return (
        <div id="booking1" className='section1'>
            <Container className="mt-5 pt-2">
            <Button variant="primary" onClick={() => getPredict()}>Get Predictions</Button>
                <center>
                <h3>Traveloka</h3>
                </center>
                {ticket && ticket.getFlight.Traveloka.slice(0,5).map((tiket, i) => {
                    return (
                        <Row className="mb-4">
                            <Col  >

                                <CardResult
                                    className="shadow rounded"

                                    tiket={tiket} key={i} />
                            </Col>
                        </Row >
                    )
                })}
                <center>
                <h3>Tiket.com</h3>
                </center>
                {ticket && ticket.getFlight.Tiket.map((tiket, i) => {
                    return (
                        <Row className="mb-4">
                            <Col  >

                                <CardResult
                                    className="shadow rounded"

                                    tiket={tiket} key={i} />
                            </Col>
                        </Row >
                    )
                })}
                <center>
                <h3>pegipegi</h3>
                </center>
                {ticket && ticket.getFlight.PegiPegi.slice(0,5).map((tiket, i) => {
                    return (
                        <Row className="mb-4">
                            <Col  >

                                <CardResult
                                    className="shadow rounded"
                                    tiket={tiket} key={i} />
                            </Col>
                        </Row >
                    )
                })}



            </Container>

        </div>
    )

}


export default ListData
