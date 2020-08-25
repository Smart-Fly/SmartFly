import React, { useState, createRef } from 'react'
import { Modal,Button } from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Checkbox from '@material-ui/core/Checkbox';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));



const ModalFilter = (props) => {
    const classes = useStyles();
    const wrapper = createRef()
    const [checked, setChecked] = React.useState(false);
    const [airlines, setAirlines] = React.useState({
        Lion : false,
        Garuda : false,
        Batik : false
    });

    const handleChangeG = (event) => {
        // setChecked(event.target.checked);
        setAirlines({...airlines, Garuda : event.target.checked});
      
    };
    const handleChangeB = (event) => {
        // setChecked(event.target.checked);
        setAirlines({...airlines, Batik :event.target.checked});
      
    };
    const handleChangeL = (event) => {
        // setChecked(event.target.checked);
        setAirlines({...airlines, Lion :event.target.checked});
      
    };
console.log(airlines,'lipndas')
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
                        <div>
                            <Checkbox
                            onChange={handleChangeG}
                            // value={checked
                            value={airlines.Garuda}
                        

                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                value='Garuda'

                            />
                            <h3>Garuda</h3>
                        </div>
                        <div>
                            <Checkbox
                            onChange={handleChangeL}
                            value={airlines.Lion}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            value='Lion'
                            />
                            <h3>Lion</h3>
                        </div>
                        <div>
                            <Checkbox
                                                        value={airlines.Batik}


                                onChange={handleChangeB}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                            <h3>Batik</h3>
                        </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=> props.filted(airlines)} >
            Save Changes
          </Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalFilter