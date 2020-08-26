import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import CardResult from "../../components/CardResult";
import { Slider, Typography } from "@material-ui/core";
import { useParams, useLocation } from "react-router-dom";
import { GET_FLIGHT_SEARCH } from "../../query/QueryPrice";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import "./list.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import ModalPredict from "../../components/ModalPredic";
import ModalFilter from "../../components/ModalFilter";

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
    Lion: false,
    Garuda: false,
    Batik: false,
    Citilink: false,
    Multi: false
  });
  const [value, setValue] = React.useState([400000, 3000000]);
  const {
    state: { data },
  } = useLocation();

  // const [ticketBucket, setTicketBucket] = useState([]);
  const [getFlight, { data: ticket, loading }] = useMutation(GET_FLIGHT_SEARCH);
  const [
    getPredictions,
    { loading: loadingPredictions, data: dataPredictions },
  ] = useLazyQuery(GET_PRED, {
    variables: {
      depart: data.dAirportCode,
      arrive: data.aAirportCode,
    },
  });
  console.log(ValueModal)
  const getPredict = () => {
    getPredictions();
    if (dataPredictions) {
      console.log(dataPredictions, 'dataa')
    } else {
      console.log(loadingPredictions)
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

  if (loading) {
    return (
      <>
        <LinearProgress color="secondary" />
          <div id='cek'>
        <Container >
          <br></br>
          <br></br>
          <Skeleton variant="rect" width={1100} height={120} />
          <br></br>
          <Skeleton variant="rect" width={1100} height={120} />
          <br></br>
          <Skeleton variant="rect" width={1100} height={120} />
          <br></br>
          <Skeleton variant="rect" width={1100} height={120} />
        </Container>
          </div>
      </>
    );
  }
  // let bucket = []

  if (ticket) {

  }
  const allTicket = () => {
    let filterAllTicket = ticket.getFlight.AllData.filter((filterTicket) => filterTicket.price > value[0] && filterTicket.price < value[1]);
    if (ValueModal.Lion) {
      let filterLion = filterAllTicket.filter((data2) => data2.airline.toLocaleLowerCase() === ("lion air" || "lion"));
      return filterLion
    }
    if (ValueModal.Garuda) {
      let filterGaruda = filterAllTicket.filter((data2) => data2.airline.toLocaleLowerCase() === ("garuda" || "garuda indonesia"));
      return filterGaruda

    }
    if (ValueModal.Batik) {
      let filterBatik = filterAllTicket.filter((data2) => data2.airline.toLocaleLowerCase() === ("batik air" || "batik"));
      return filterBatik

    }
    if (ValueModal.Citilink) {
      let filterCitilink = filterAllTicket.filter((data2) => data2.airline.toLocaleLowerCase() === ("citilink" || "citilink indonesia"));
      console.log(filterCitilink)
      return filterCitilink
    }
    if (ValueModal.Multi) {
      let filterMulti = filterAllTicket.filter((data2) => data2.airline === ("Multi-maskapai" || "Multi-airline"));
      return filterMulti
    } else {
      return filterAllTicket;
    }

  };
  // console.log(bucket,'array')

  // console.log(modalShowFilter)
  // console.log(ticketBucket, 'bcuekt')
  const toRupiah = (money) => {
    return Intl.NumberFormat("id", {
      style: "currency",
      currency: "idr",
    }).format(money);
  };


  // if (ticket) {
  //   console.log(ticket.getFlight.AllData, 'data total')
  //   console.log(allTicket(), 'data filter')
  // }
  const toModal = () => {
    getPredict();
    setModalShow(true);
  };

  return (
    <div id="booking1" >
      <ModalFilter
        show={modalShowFilter}
        filted={(dataModal) => {
         { setValueModal(dataModal)}
        }}
        onHide={() => {
          setModalShowFilter(false);
        }}
      />

      <ModalPredict
        show={modalShow}
        dataPredictions={dataPredictions}
        onHide={() => {
          setModalShow(false);
        }}
      ></ModalPredict>
      <Container >
        <div className="clearfix ">
          <center>

        <br></br>
            <Button variant="primary" onClick={() => toModal()}>
              Get Predictions
      </Button>
            <Button variant="primary" style={{margin:'10px'}} onClick={() => setModalShowFilter(true)}>
              Filter check
      </Button>
          </center>
          <Typography className="float-left" style={{ color: 'white' }}>{toRupiah(value[0])}</Typography>
          <Typography className="float-right" style={{ color: 'white' }}>{toRupiah(value[1])}</Typography>
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

        {ticket && allTicket().map((tiket, i) => {
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
  );
}

export default ListData;
