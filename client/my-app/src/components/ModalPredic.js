import "./StylePredic.css";
import React, { createRef } from "react";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
const graph = require("../asset/graph1.png");
// const graph2 = require("../asset/graph2.png")
const graph2 = require("../img/analis.svg");
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const ModalPredic = (props) => {
  const classes = useStyles();
  const wrapper = createRef();
  const { dataPredictions } = props;
  console.log(props);
  const sentence = () => {
    let temp = "";
    let { accuracy } = dataPredictions.predictions;
    // console.log(accuracy)
    if (accuracy > 0) {
      temp = "Buy Now";
    } else {
      temp = "Wait";
    }

    return (
      <div>
        <h2> {temp} </h2>
        <img src={graph2} width="300" height="300" alt="prediction-img" />
        <h3> Accuracy: {accuracy.toFixed(2) * 100} % </h3>
      </div>
    );
  };
  return (
    <div>
      <Modal
        ref={wrapper}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <center>Future Price Forecast</center>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            {dataPredictions ? (
              <div>
                <h3>Predictions for the future</h3>
                {sentence()}
              </div>
            ) : (
              <CircularProgress color="secondary" />
            )}
          </center>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={props.onHide}>
            Save Changes
          </Button> */}
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalPredic;
