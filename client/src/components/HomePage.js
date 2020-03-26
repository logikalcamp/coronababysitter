import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
    },
    paperVolunteer: {
      width: "20%",
      height: 300,
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    paperBlank: {
        width: "80%",
        height: 300,
        padding: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    paperFull: {
        width: "96%",
        height: 300,
        padding: theme.spacing(2),
        marginTop: theme.spacing(4),
    }
  }));
  
const myNextVolunteer = `ההתנדבויות הבאות שלי`
    
const volunteer = `כאן יהיה שורות עם כל ההתנדבויות הבאות של המשתמש`;

export const HomePage = (props) => {
    console.log(props)
    const classes = useStyles();
    return (
            <HomeCon>
                <div>
                    <label>היי ____, כיף שבאת! </label>
                    <img src={window.location.origin + "/images/wavingHand.png"} />
                </div>
                <p>
                כשהמציאות לא קלה, אנשים טובים יכולים לשפר אותה
                </p>

                <Grid container wrap="nowrap" spacing={2}>
                    <Paper className={classes.paperVolunteer}>
                    <Grid item xs>
                        <Typography>
                        <Img>
                        <img src={window.location.origin + "/images/calender.png"} />
                        {myNextVolunteer}
                        </Img>
                        <hr></hr>
                        {volunteer}
                        </Typography>
                    </Grid>
                    </Paper>
                    <Paper className={classes.paperBlank}>
                    <Grid item xs>
                        <Typography></Typography>
                    </Grid>
                    </Paper>
                </Grid>
                <Grid container wrap="nowrap" spacing={2}>
                    <Paper className={classes.paperFull}>
                        <Grid item xs>
                            <Typography></Typography>
                        </Grid>
                    </Paper>
                </Grid>
            </HomeCon>
    )
}

const HomeCon = styled.div`
    display:flex;
    flex-direction:column;
    max-width:1366px;
    padding-right: 200px;
    padding-left: 200px;
    img{
        width:2rem;
        height:2rem;
        margin-right:1rem;
        padding-top:1rem;
    }
    label{
        font-weight:bold;
        font-size:25px;
    }
`

const Img = styled.div`
    img{
        width:1rem;
        height:1rem;
        margin-left:0.5rem;
        margin-right:0rem;
        padding-top:0rem;
    }
    label{
        font-weight:bold;
        font-size:25px;
    }
`