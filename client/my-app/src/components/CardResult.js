import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  CardActions,
  Avatar,
  CardHeader,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
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
        <CardContent >
          <CardMedia > <img width="150" height="80" src={data.airLineLogo} /></CardMedia>
          <Typography gutterBottom variant="h4" component="h1">
            {data.airline}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <CardHeader
            title="Departure"
            subheader={data.departureTime}
          ></CardHeader>
          <CardHeader
            title="Arrival"
            subheader={data.arrivalTime}
          ></CardHeader>
        </CardActions>
        <CardContent>
          <CardMedia > <img width="150" height="80" src={data.companyLogo} /></CardMedia>
        </CardContent>
        <CardActions disableSpacing>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h1">
              {Intl.NumberFormat('id', { style: 'currency', currency: 'idr' }).format(data.price)}
            </Typography>
            <Button href={data.url} target="_blank" target="_blank" size="big" variant="contained" >
              Learn More
                    </Button>
          </CardContent>
        </CardActions>
      </Card>
    </>
  )

}

export default CardResult;
