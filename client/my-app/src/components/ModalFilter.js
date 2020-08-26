import React, { useState, createRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const ModalFilter = (props) => {
  const classes = useStyles();
  const wrapper = createRef();
  const [checked, setChecked] = React.useState(false);
  const [airlines, setAirlines] = React.useState({
    Lion: false,
    Garuda: false,
    Batik: false,
    Citilink: false,
    Multi: false
  });
  console.log(airlines, 'airness')
  // console.log(props,'propsee')
  const handleChangeG = (event) => {
    setAirlines({ ...airlines, Garuda: event.target.checked });
  };
  const handleChangeB = (event) => {
    setAirlines({ ...airlines, Batik: event.target.checked });
  };
  const handleChangeL = (event) => {
    setAirlines({ ...airlines, Lion: event.target.checked });
  };
  const handleChangeC = (event) => {
    setAirlines({ ...airlines, Citilink: event.target.checked });
  };
  const handleChangeM = (event) => {
    setAirlines({ ...airlines, Multi: event.target.checked });
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
            <center>Filter Airlines</center>
          </Modal.Title>
        </Modal.Header>
          <center>
        <Modal.Body>
          <FormControlLabel
            label='Garuda Indonesia'
            labelPlacement="top"
            control={
              <Checkbox
                checked={airlines.Garuda}
                onChange={handleChangeG}
                value={airlines.Garuda}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="Garuda"
              />}
          />
          <FormControlLabel
            label='Lion Air'
            labelPlacement="top"
            control={
              <Checkbox
                checked={airlines.Lion}

                onChange={handleChangeL}
                value={airlines.Lion}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                value="Lion"
              />}
          />
          <FormControlLabel
            label='Batik Air'
            labelPlacement="top"
            control={
              <Checkbox
                checked={airlines.Batik}

                value={airlines.Batik}
                onChange={handleChangeB}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />}
          />
          <FormControlLabel
            label='Multi-airline'
            labelPlacement="top"
            control={
              <Checkbox
                checked={airlines.Multi}

                value={airlines.Multi}
                onChange={handleChangeM}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />}
          />
          <FormControlLabel
            label='Citilink'
            labelPlacement="top"
            control={
              <Checkbox
                checked={airlines.Citilink}
                value={airlines.Citilink}
                onChange={handleChangeC}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />}
          />

        </Modal.Body>
        </center>

        <Modal.Footer>
        
          <Button variant="primary" onClick={() => props.filted(airlines)}>
            Save Changes
          </Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ); 
};

export default ModalFilter;
