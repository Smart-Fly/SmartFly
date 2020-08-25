import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import CardResult from "../../components/CardResult";
import { Slider, Typography } from "@material-ui/core";
import { useParams, useLocation } from 'react-router-dom'
import { GET_FLIGHT_SEARCH } from '../../query/QueryPrice'
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client'
import './list.css'
import LinearProgress from '@material-ui/core/LinearProgress'
import Skeleton from '@material-ui/lab/Skeleton';
import ModalPredict from '../../components/ModalPredic'
import ModalFilter from '../../components/ModalFilter'
// import Aos from 'aos'
// import 'aos/dist/aos'


const GET_PRED = gql`
  query getPrediction($depart: String, $arrive: String) {
    predictions(departure: $depart, arrival: $arrive) {
      accuracy
      slopeGraph
      intercept
    }
  }
`;

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
        padding: "13px 0",
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
            boxShadow: "#ccc 0 2px 3px 1px",
        },
        "& .bar": {
            // display: inline-block !important;
            height: 9,
            width: 1,
            backgroundColor: "currentColor",
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    track: {
        height: 3,
    },
    rail: {
        color: "#d8d8d8",
        opacity: 1,
        height: 3,
    },
})(Slider);

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        flex: "1 0 auto",
    },
    cover: {
        width: 151,
    },
    controls: {
        display: "flex",
        alignItems: "center",
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
    const [modalShowFilter, setModalShowFilter] = useState(false);
    const [ValueModal, setValueModal] = useState(null);
    const [value, setValue] = React.useState([400000, 700000]);
    const { state: { data } } = useLocation()
    const [dummyData, setDataDummy] = useState([])
    const [allData, setAllData] = useState([])
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
            // console.log(dataPredictions, 'dataa')
        }
        else {
            // console.log(loadingPredictions)
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

        if (ticket) {
            // console.log(ticket)
            let temp = []
            for (const [key, value] of Object.entries(ticket.getFlight)) {
                // console.log(`${key}: ${value}`);
                console.log(value, 'value')
                console.log(key, 'keyd')
                if ("__typename" != key) {
                    if (ValueModal.Lion) {
                        let temp2 = value.filter(data2 => data2.airline.toLocaleLowerCase() == ('lion air' || 'lion'))
                        temp.push(...temp2)

                    }
                    if (ValueModal.Garuda){
                            let temp3 = value.filter(data3 => data3.airline.toLocaleLowerCase() == ('garuda' || "garuda indonesia") )
                            temp.push(...temp3)

                        }
                        if (ValueModal.Batik){
                            let temp4 = value.filter(data4 => data4.airline.toLocaleLowerCase() == ('batik air' || "batik") )
                            temp.push(...temp4)
                        }
                }
            }
            setAllData(temp)
        }
    }, [ValueModal])
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
                    classType: data.classType,
                },
            },
        });
    }, [slug, data, getFlight]);

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
            "airline": "Lion",
            "departureTime": "18:30",
            "arrivalTime": "21:20",
            "price": 624600,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450349861201-09ec8f298222a73d66e8e96aa3b918f0.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Lion",
            "departureTime": "05:00",
            "arrivalTime": "10:20",
            "price": 685700,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450349861201-09ec8f298222a73d66e8e96aa3b918f0.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Batik",
            "departureTime": "07:00",
            "arrivalTime": "09:50",
            "price": 798400,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2019/12/13/1576208649600-12471f9b7ffa159361f7bbbfb63065ee.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Batik",
            "departureTime": "13:00",
            "arrivalTime": "16:00",
            "price": 798400,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2019/12/13/1576208649600-12471f9b7ffa159361f7bbbfb63065ee.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Batik",
            "departureTime": "15:40",
            "arrivalTime": "18:30",
            "price": 798400,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2019/12/13/1576208649600-12471f9b7ffa159361f7bbbfb63065ee.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Batik",
            "departureTime": "17:00",
            "arrivalTime": "19:50",
            "price": 798400,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2019/12/13/1576208649600-12471f9b7ffa159361f7bbbfb63065ee.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Citilink",
            "departureTime": "04:55",
            "arrivalTime": "07:55",
            "price": 856700,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450350561012-6584b693edd67d75cfc25ecff41c5704.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Citilink",
            "departureTime": "14:15",
            "arrivalTime": "17:10",
            "price": 856700,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450350561012-6584b693edd67d75cfc25ecff41c5704.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        },
        {
            "airline": "Citilink",
            "departureTime": "16:40",
            "arrivalTime": "19:40",
            "price": 856700,
            "airLineLogo": "https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450350561012-6584b693edd67d75cfc25ecff41c5704.png?tr=q-75",
            "url": "https://www.traveloka.com/en-id/flight/onewaysearch?ap=CGK.DPS&dt=28-08-2020.NA&ps=1.0.1&sc=economy",
            "companyLogo": "https://press.traveloka.com/wp-content/uploads/2016/09/Traveloka_Primary_Logo.png"
        }]

    // FIlter

    console.log(allData, 'TOtal')

    const dataTraveloka = () => {
        let filterTraveloka = ticket.getFlight.Traveloka.filter(dum => dum.price > value[0] && dum.price < value[1])
        return filterTraveloka
    }
    const dataTiket = () => {
        let filterTiket = ticket.getFlight.Tiket.filter(dum => dum.price > value[0] && dum.price < value[1])
        return filterTiket
    }
    const dataPegiPegi = () => {
        let filterPegiPegi = ticket.getFlight.PegiPegi.filter(dum => dum.price > value[0] && dum.price < value[1])
        return filterPegiPegi
    }
    const toRupiah = (money) => {
        return Intl.NumberFormat('id', { style: 'currency', currency: 'idr' }).format(money)
    }

    // const filterLion = () =>{
    //     let lions = dummy.filter(dum => dum.airline.toLowerCase() == "Lion Air".toLowerCase())
    //     return lions
    // }

    // console.log(filterLion())
    if (ticket) {
        // console.log(ticket.getFlight.Tiket)
        // console.log(dataPegiPegi(), 'pegis')
        // console.log(dataTiket(), 'ticekt')
    }
    const toModal = () => {
        getPredict()
        setModalShow(true)
    }
    // if (ticket) {

    //     console.log(ticket.getFlight.Tiket)
    // }
    return (
        <div id="booking1" className='section1'>


            <ModalFilter show={modalShowFilter} filted={(dataModal) => { setValueModal(dataModal) }}
                onHide={() => { setModalShowFilter(false) }}
            />



            <ModalPredict show={modalShow} dataPredictions={dataPredictions}

                onHide={() => { setModalShow(false) }}
            ></ModalPredict>
            <Container className="mt-5 pt-4">
                <div className="clearfix ">
                    <center>
                        <Button variant="primary" onClick={() => toModal()} >Get Predictions</Button>
                        <br></br>
                        <Button variant="primary" onClick={() => setModalShowFilter(true)} >Filter check</Button>
                        {/* <Button variant="primary" onClick={() => toModal()} >Get Predictions</Button>
                    <Button variant="primary" onClick={() => toModal()} >Get Predictions</Button> */}
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




                {/* {dummy.map((tiket, i) => {
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



            {ticket && allData.map((tiket, i) => {
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
                {/* {ticket && dataTiket().map((tiket, i) => {
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

                {/* {ticket && dataPegiPegi().map((tiket, i) => {
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



export default ListData;
