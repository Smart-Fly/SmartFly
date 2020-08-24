import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardResult from '../components/CardResult'

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
const Result = () => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div id="booking" className='section'>
            <br></br>
            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                        <CardResult />
                        {/* <br></br> */}
                    </Col>
                    <Col>
                        <CardResult />
                    </Col>

                </Row>
                <Row>
                    <Col md={4}>
                        {/* <CardResult /> */}
                        <br></br>
                    </Col>
                    <Col>
                        <CardResult />
                    </Col>

                </Row>
                        <br></br>
                <Row>
                    <Col md={4}>
                        {/* <CardResult /> */}
                    </Col>
                    <Col>
                        <CardResult />
                    </Col>

                </Row>
            </Container>

        </div>
    )

}


export default Result
