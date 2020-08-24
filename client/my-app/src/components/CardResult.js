import React, { Component } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
    CardActionArea,
    Button,
    CardActions,
    Avatar,
    CardHeader
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: "space-evenly",
        textAlign: 'center'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 15,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));
const CardResult = (props) => {
    // console.log(props.tiket)
    const data = props.tiket
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <Card className={classes.root}>
                <CardActions>
                    <CardContent>
                        <Avatar alt="Remy Sharp" src={data.airLineLogo} className={classes.large} />
                    </CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.airline}
                    </Typography>
                    <CardHeader
                        title="Departure"
                        subheader={data.departureTime}
                    ></CardHeader>
                    <CardHeader
                        title="Arrival"
                        subheader={data.arrivalTime}
                    ></CardHeader>
                </CardActions>
                <CardActions >
                    <Button size="small" color="primary">
                        {Intl.NumberFormat('id', { style: 'currency', currency: 'idr' }).format(data.price)}
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </>
    )

}


export default CardResult