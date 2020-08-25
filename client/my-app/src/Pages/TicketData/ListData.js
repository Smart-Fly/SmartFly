import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import CardResult from '../../components/CardResult'
import { Slider, Typography } from "@material-ui/core";
import { useParams, useLocation } from 'react-router-dom'
import { GET_FLIGHT_SEARCH } from '../../query/QueryPrice'
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client'
import './list.css'
import LinearProgress from '@material-ui/core/LinearProgress'
import Skeleton from '@material-ui/lab/Skeleton';
import ModalPredict from '../../components/ModalPredic'
import Aos from 'aos'
import 'aos/dist/aos'


const GET_PRED = gql`
	query getPrediction($depart: String, $arrive: String) {
		predictions(departure: $depart, arrival: $arrive) {
			accuracy
			slopeGraph
      intercept
		}
	}
`
function AirbnbThumbComponent(props) {
    return (
        <span {...props}>
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
        </span>
    );
}
const AirbnbSlider = withStyles({
    root: {
        color: "#3a8589",
        height: 3,
        padding: "13px 0"
    },
    thumb: {
        height: 27,
        width: 27,
        backgroundColor: "#fff",
        border: "1px solid currentColor",
        marginTop: -12,
        marginLeft: -13,
        boxShadow: "#ebebeb 0 2px 2px",
        "&:focus, &:hover, &$active": {
            boxShadow: "#ccc 0 2px 3px 1px"
        },
        "& .bar": {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1
        }
    },
    active: {},
    track: {
        height: 3
    },
    rail: {
        color: "#d8d8d8",
        opacity: 1,
        height: 3
    }
})(Slider);

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
    const [modalShow, setModalShow] = useState(false);
    const [value, setValue] = React.useState([400000, 700000]);
    const { state: { data } } = useLocation()
    const [dummyData, setDataDummy] = useState([])
    const [getFlight, { data: ticket, loading }] = useMutation(GET_FLIGHT_SEARCH)
    const [getPredictions, { loading: loadingPredictions, data: dataPredictions }] = useLazyQuery(GET_PRED, {
        variables: {
            depart: data.dAirportCode,
            arrive: data.aAirportCode
        }
    });

    const getPredict = () => {
        getPredictions()
        if (dataPredictions) {
            console.log(dataPredictions, 'dataa')
        }
        else {
            console.log(loadingPredictions)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
   
    useEffect(() => {
        // getFlight({
        //     variables: {
        //         search: {
        //             dAirportCode: data.dAirportCode,
        //             aAirportCode: data.aAirportCode,
        //             planDate: data.planDate,
        //             psAdult: data.psAdult,
        //             psChild: data.psChild,
        //             psInfant: data.psInfant,
        //             classType: data.classType
        //         }
        //     }
        // })
    }, [slug, data, getFlight])

    
    if (loading) {
        return (
            <>
                <LinearProgress color="secondary" />
                <Container className="mt-5 pt-2">
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

    let dummy = [
        {
            "airline": "Lion Air",
            "departureTime": "18:30",
            "arrivalTime": "21:20",
            "price": 624600,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2019/12/13/1576208649600-12471f9b7ffa159361f7bbbfb63065ee.png?tr=q-75"
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

    // FIlter
    const dataTraveloka = () => {
        let filterTraveloka = ticket.getFlight.Traveloka.filter(dum => dum.price > value[0] && dum.price < value[1])
        return filterTraveloka
    }
    const dataTiket = () => {
        let filterTiket = dummy.filter(dum => dum.price > value[0] && dum.price < value[1])
        return filterTiket
    }
    const dataPegiPegi = () => {
        let filterPegiPegi = dummy.filter(dum => dum.price > value[0] && dum.price < value[1])
        return filterPegiPegi
    }
    const toRupiah = (money) => {
        return Intl.NumberFormat('id', { style: 'currency', currency: 'idr' }).format(money)
    }

    const toModal = () => {
        getPredict()
        setModalShow(true)
    }

    console.log(ticket)
    return (
        <div id="booking1" className='section1'>

            <ModalPredict show={modalShow} dataPredictions={dataPredictions} onHide={() => { setModalShow(false) }} ></ModalPredict>
            <Container className="mt-5 pt-4">
            <div className="clearfix ">
                    <center>
                    <Button variant="primary" onClick={() => toModal()} >Get Predictions</Button>
                    <Button variant="primary" onClick={() => toModal()} >Get Predictions</Button>
                    <Button variant="primary" onClick={() => toModal()} >Get Predictions</Button>
                    </center>
                    <Typography className="float-left" >{toRupiah(value[0])}</Typography>
                    <Typography className="float-right"  >{toRupiah(value[1])}</Typography>
                    </div>
                <AirbnbSlider
                    value={value}
                    onChange={handleChange}
                    ThumbComponent={AirbnbThumbComponent}
                    step={100000}
                    min={0}
                    max={5000000}
                />
                

                <div className="clearfix mb-3 mt-3">
                    <h4 className="float-left ">Traveloka</h4>
                </div>

                {/* {ticket && dataTraveloka().map((tiket, i) => {
                    return (
                        <Row className="mb-4">
                            <Col  >

                                <CardResult
                                    className="shadow rounded"

                                    tiket={tiket} key={i} />
                            </Col>
                        </Row >
                    )
                })} */}
                {dummy.map((tiket, i) => {
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

                {/* {dataTiket().length > 0 ?
                    <div className="clearfix mb-3 mt-3">
                        <h4 className="float-left ">Tiket.com</h4>
                    </div> : null}
                {ticket && dataTiket().map((tiket, i) => {
                    return (
                        <Row className="mb-4">
                            <Col  >
                                <CardResult
                                    className="shadow rounded"
                                    tiket={tiket} key={i} />
                            </Col>
                        </Row >
                    )
                })} */}
                {/* {dataPegiPegi().length > 0 ?
                    <div className="clearfix mb-3 mt-3">
                        <h4 className="float-left ">PegiPegi</h4>
                    </div> : null}
                {ticket && dataPegiPegi().map((tiket, i) => {
                    return (
                        <Row className="mb-4">
                            <Col  >

                                <CardResult
                                    className="shadow rounded"
                                    tiket={tiket} key={i} />
                            </Col>
                        </Row >
                    )
                })} */}
            </Container>
        </div>
    )

}


export default ListData
