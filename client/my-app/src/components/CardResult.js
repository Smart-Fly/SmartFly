import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  // CardActionArea,
  Button,
  CardActions,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import TelegramIcon from '@material-ui/icons/Telegram';

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
  const data = props.tiket;
  const classes = useStyles();
  const theme = useTheme();

  const handleImage = () => {

    if (data.airline === "Lion" || data.airline === 'Lion Air') {
      return "https://logos-download.com/wp-content/uploads/2016/05/Lion_Air_logo_small.png"
    } else if (data.airline === "Batik Air" || data.airline === 'Batik') {
      return "https://1.bp.blogspot.com/-0LhrImUBias/Xn4ECOnTDLI/AAAAAAAABxo/GXXicXuEEU0mjJnAbAkKPD-ZQdQV8BRzQCLcBGAsYHQ/s1600/Logo%2BBatik%2BAir.png"
    } else if (data.airline === "Citilink Indonesia" || data.airline === 'Citilink') {
      return "https://i.pinimg.com/originals/e9/0c/43/e90c43e10bd7786eac217ddd61359652.png"
    } else if (data.airline === "Garuda Indonesia" || data.airline === 'Garuda') {
      return "https://i.pinimg.com/originals/83/bd/70/83bd70f58c962ded056b2d57227de1d5.jpg"

    } else if (data.airline === "Multi-maskapai" || data.airline === 'Multi-airline') {
      return data.airLineLogo
    }
    else {
      return data.airLineLogo
    }
  }

  const nameAirline =()=>{
    if (data.airline == "Citilink Indonesia" ) {
        return "Citilink"
      }else if(data.airline == "Garuda Indonesia"){
        return "Garuda"

    }
    else{
      return data.airline
    }
  } 
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <CardMedia>
            {" "}
            <img
              width="150"
              height="120"
              alt="airline-logo"
              src={handleImage()}
            />
          </CardMedia>
          {data.airline == "Multi-airline" ?
          <Typography gutterBottom variant="h5" component="h2" >
            {nameAirline() }
          </Typography>
          :
          <Typography gutterBottom variant="h4" component="h1" >
            {nameAirline() }
          </Typography>}
        </CardContent>

        <CardActions disableSpacing>
          <CardHeader
          subheader="Departure"
          title={data.departureTime}
          ></CardHeader>
          <CardHeader subheader="Arrival" title={data.arrivalTime}></CardHeader>
        </CardActions>
        <CardContent>
          <Typography>

            <br></br>
          </Typography>
          <CardMedia >
            <img
              width="200"
              height="100"
              alt="flight-service-logo"
              src={data.companyLogo}
            />
          </CardMedia>
        </CardContent>
        <CardActions disableSpacing>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h1">
             Rp {
              
              data.price.toLocaleString('id-ID')
              }

            </Typography>
            <Button
              href={data.url}
              target="_blank"
              target="_blank"
              size="big"
              variant="contained"
              startIcon={<TelegramIcon/>}
            >
              Buy Now
            </Button>
          </CardContent>
        </CardActions>
      </Card>
    </>
  );
};

export default CardResult;
