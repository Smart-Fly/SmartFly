import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import CardResult from "../../components/CardResult";
import Button from '@material-ui/core/Button';
import { Slider, Typography } from "@material-ui/core";
import { useParams, useLocation } from "react-router-dom";
import { GET_FLIGHT_SEARCH } from "../../query/QueryPrice";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import "./list.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import ModalPredict from "../../components/ModalPredic";
import ModalFilter from "../../components/ModalFilter";
import FilterListIcon from '@material-ui/icons/FilterList';

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
  const { slug } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [modalShowFilter, setModalShowFilter] = useState(false);
  const [ValueModal, setValueModal] = useState({
    Lion: true,
    Garuda: true,
    Batik: true,
    Citilink: true,
    Multi: true
  });
  const [value, setValue] = React.useState([400000, 3000000]);
  const {
    state: { data },
  } = useLocation();

  // const [ticketBucket, setTicketBucket] = useState([]);
  const [getFlight, { data: ticket, loading }] = useMutation(GET_FLIGHT_SEARCH);
  const [ticketLocal, setTicketLocal] = useState([])


  useEffect(() => {
    if (ticket != null) {

      setTicketLocal(ticket.getFlight.AllData)
    }
  }, [ticket])
  const [
    getPredictions,
    { loading: loadingPredictions, data: dataPredictions },
  ] = useLazyQuery(GET_PRED, {
    variables: {
      depart: data.dAirportCode,
      arrive: data.aAirportCode,
    },
  });
  // console.log(ValueModal)
  const getPredict = () => {
    getPredictions();
    if (dataPredictions) {
      console.log(dataPredictions, "dataa");
    } else {
      console.log(loadingPredictions);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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




  const onFilter = (params) => {
    const newTicketLocal = ticket.getFlight.AllData.filter(ticketfil => {
      const filterPrice = ticketfil.price > value[0] && ticketfil.price < value[1]
      if (ticketfil.airline.toLocaleLowerCase() == ("lion air" || "lion")) {
        if (params.Lion) return filterPrice
      }
      else if (ticketfil.airline == ("Garuda" || "Garuda Indonesia")) {
        if (params.Garuda) return filterPrice
      }
      else if (ticketfil.airline.toLocaleLowerCase() == ("batik air" || "batik")) {
        if (params.Batik) return filterPrice
      }
      else if (ticketfil.airline == ("Citilink" || "Citilink Indonesia")) {
        if (params.Citilink) return filterPrice
      }
      else if (ticketfil.airline == ("Multi-maskapai" || "Multi-airline")) {
        if (params.Multi) return filterPrice
      } else if (params.Lion == false && params.Garuda == false
        && params.Batik == false && params.Citilink == false && params.Multi == false) {
        return filterPrice
      }
    })
    setTicketLocal(newTicketLocal)
  }

  useEffect(() => {
    if (ticket != null) {
      onFilter(ValueModal)
    }
    console.log(value)
  }, [value])

  if (loading) {
    return (
      <>
        <div id='cek' >
          <LinearProgress color="secondary" />
          <Container >
            <br></br>
            <br></br>
            <div style={{ marginTop: '60px' }} >

              <Skeleton variant="rect" width={1100} height={120} />
              <br></br>
              <Skeleton variant="rect" width={1100} height={120} />
              <br></br>
              <Skeleton variant="rect" width={1100} height={120} />
              <br></br>
              <Skeleton variant="rect" width={1100} height={120} />
            </div>
          </Container>
        </div>
      </>
    );
  }

  const toRupiah = (money) => {
    return money.toLocaleString('id-ID')

  };


  if (ticket) {
    console.log(ticketLocal, 'data total')
    // console.log(allTicket(), 'data filter')
  }
  const toModal = () => {
    getPredict();
    setModalShow(true);
  };
  const toModalFilter = (params) => {
    onFilter(params)
    setValueModal(params)
    setModalShowFilter(false)
  }

  return (
    <div >
      <div id="booking1" >
        <ModalFilter show={modalShowFilter} filted={(dataModal) => toModalFilter(dataModal)}
          onHide={() => {
            setModalShowFilter(false);
          }}
        />

        <ModalPredict show={modalShow} dataPredictions={dataPredictions}
          onHide={() => {
            setModalShow(false);
          }}
        ></ModalPredict>
        <Container>
          <div className="clearfix ">
            <center>

              <br></br>
              <Button startIcon={<FilterListIcon />} variant="primary" onClick={() => toModal()}>
                Get Predictions
      </Button>
              <Button startIcon={<FilterListIcon />} variant="primary" style={{ margin: '10px' }} onClick={() => setModalShowFilter(true)}>
                Filter check
            </Button>
            </center>
            <Typography className="float-left" style={{ color: 'white' }}>Rp {toRupiah(value[0])}</Typography>
            <Typography className="float-right" style={{ color: 'white' }}>Rp {toRupiah(value[1])}</Typography>
          </div>
          <AirbnbSlider
            value={value}
            onChange={handleChange}
            ThumbComponent={AirbnbThumbComponent}
            step={100000}
            min={0}
            max={5000000}
          />
          <br></br>
          <br></br>

          {ticket && ticketLocal.map((tiket, i) => {
            return (
              <Row className="mb-4">
                <Col  >
                  <CardResult
                    className="shadow rounded"
                    tiket={tiket} key={i} />
                </Col>
              </Row >
            )
          })
          }
        </Container>
        <br></br>
      </div>
    </div>

  );
};

export default ListData;
