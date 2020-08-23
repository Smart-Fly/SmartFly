import React, { Component } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import {Col} from 'react-bootstrap'

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        textAlign:'center'
    },
    // details: {
    //     display: 'flex',
    //     flexDirection: 'column',
    // },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));
const CardResult = () => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    {/* <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="50"
                        image="data:image/png;base64,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"
                        title="Contemplative Reptile"
                    /> */}

                    {/* <Avatar alt="Remy Sharp" src="https://miro.medium.com/max/2100/1*CvSLUjo2KYXp7M594-5ISg.jpeg" className={classes.large} /> */}
                    <CardContent>
                    <Avatar alt="Remy Sharp" src="https://ik.imagekit.io/tvlk/image/imageResource/2015/12/17/1450349861201-09ec8f298222a73d66e8e96aa3b918f0.png?tr=q-75" className={classes.large} />
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
          </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                       Buy Ticket
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