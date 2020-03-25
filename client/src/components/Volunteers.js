import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import {RemoveScrollBar} from 'react-remove-scroll-bar';

const styles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection:'column',
      padding: "50px 75px 0px 75px"
    },
    titleFilter: {
        display: 'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        fontSize: '22px'
    },
    table: {
        width: '100%'
    },
    tableHeader: {
        display:'flex',
        flexDirection:'row',
        width: '100%',
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '8px',
        background: '#FFFFFF 0% 0% no-repeat padding-box'
    },
    titleCell: {
        flex:'1',
        textAlign: 'center',
        color:'#A0A0A0',
        fontSize: '12px',
        padding:'5px 0px 5px 0px'
    },
    rowCell: {
        flex:1,
        textAlign:'center',
        height: 65,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    tableRow: {
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 1px 6px #00000029',
        background:'#FFFFFF 0% 0% no-repeat padding-box',
        borderRadius:'8px',
        margin:'5px 0px 5px 0px'
    },
    tableBody: {
        height: '600px',
        overflow: 'hidden',
    },
    tableContent: {
        height:'100%',
        width:'100%',
        overflow: 'auto',
        WebkitScrollBar: 'none'

    },
    margin: {
        margin: theme.spacing(1)
    }
  }));

export const VolunteersPage = (props) => {
    const classes = styles();

    var list = [{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    },{
        firstName: 'נטע',
        lastName: 'אלכמיסטר',
        email: 'Neta@gmail.com',
        phone: '05255156232',
        institute: 'אוניברסיטת תל אביב',
        address: 'גבעתיים, השיזף 8'
    }]

    var voluteerMap = list.map(item => <div className={classes.tableRow}>
        <div className={classes.rowCell}>
            <img></img>
            <div>
                {item.firstName + ' ' + item.lastName}
            </div>
        </div>
        <div className={classes.rowCell}>{item.address}</div>
        <div className={classes.rowCell}>{item.email}</div>
        <div className={classes.rowCell}>{item.phone}</div>
        <div className={classes.rowCell}>{item.institute}</div>
        <div className={classes.rowCell}></div>
    </div>)

    return (
        <div className={classes.root}>
            <div className={classes.titleFilter}>
                <div className={classes.title}>
                    מאגר המתנדבים
                </div>
                <div className={classes.margin}>
                    <TextField id="search-text" label="חפש מתנדב במאגר"
                     InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />        
                </div>
            </div>
            <div className={classes.table}>
                <div className={classes.tableHeader}>
                    <div className={classes.titleCell}>שם המתנדב</div>
                    <div className={classes.titleCell}>כתובת מגורים</div>
                    <div className={classes.titleCell}>כתובת אימייל</div>
                    <div className={classes.titleCell}>מספר טלפון</div>
                    <div className={classes.titleCell}>מוסד לימודים</div>
                    <div className={classes.titleCell}></div>
                </div>
                <div className={classes.tableBody}>
                    <div className={classes.tableContent}>
                        {voluteerMap}
                    </div>
                </div>
            </div>
        </div>
    )
}