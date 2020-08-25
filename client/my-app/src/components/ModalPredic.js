import React, { useState, createRef } from 'react'
import { Modal } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));



const ModalPredic = (props) => {
    const classes = useStyles();
    const wrapper = createRef()
    const { dataPredictions } = props

    const sentence = () => {
        let temp = ''
        let {accuracy} = dataPredictions.predictions
        // console.log(accuracy)
        if (accuracy > 0) {
            temp = 'harga naik'
        } else {
            temp = 'harga turun'
        }

        return (
            <>
                <h2> {temp} </h2>
                <h3> dengan accuracy {Math.round(accuracy)} % </h3>
            </>
        )

    }
    console.log(Math.round(0.9698275862068966))

    return (
        <div >
            <Modal
                ref={wrapper}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <center>
                        current predictions
                     </center>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <center>
                        {dataPredictions ? 
                        <div>

                        <h3>Predictions for the future</h3>
                        {sentence()}
                        </div>
                         : 
                        <CircularProgress color="secondary" />
                      }
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
}

export default ModalPredic