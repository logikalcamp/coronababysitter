import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import Button from '@material-ui/core/Button';

import CloseIcon from '@material-ui/icons/Close';
import EventIcon from '@material-ui/icons/Event';
import { FaBaby, FaRegClock } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { TiLocationOutline } from 'react-icons/ti';

import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function RTL(props) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}

const theme = createMuiTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MapFilterForm = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const FormHeader = styled.div`
  height: 100px;
  align-self: center;
  display: flex;
  align-items: center;

  span {
    background-color: #53B4931A;
    padding: 0.5em 1em;
    border-radius: 25px;
    color: #935ED7;
    font-size: 25px;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    cursor: pointer;
  }
`;
const FormRow = styled.div`
  height: 75px;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
`;
const FormRowGroup = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    display: flex;
    align-items: center;

    svg {
      width: 16px;
      height: 16px;
      margin-inline-end: 5px;
    }
  }
`;
const FromRowInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const FormButtoms = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 4em);
  padding: 2em 2em;
  display: flex;
  justify-content: space-between;

  button {
    font-size: 18px;
    padding: 0.5em 1.5em;
  }
`;

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
  {
    value: 0,
    label: '0 ק״מ',
  },
  {
    value: 100,
    label: '100 ק״מ',
  },
];

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: '-50%',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  }
})(Slider);

function valuetext(value) {
  return `${value} ק״מ`;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200
    },
  },
};

function padToTwo(number) {
  if (number<=99) { number = ("0"+number).slice(-2); }
  return number;
}

export const MapFilterModal = (props) => {
  const [startDate, setStartDate] = React.useState(props.startDate);
  const [endDate, setEndDate] = React.useState(props.endDate);
  const [startAge, setStartAge] = React.useState(props.startAge);
  const [endAge, setEndAge] = React.useState(props.endAge);
  const [startChildAmount, setStartChildAmount] = React.useState(props.startChildAmount);
  const [endChildAmount, setEndChildAmount] = React.useState(props.endChildAmount);
  const [distance, setDistance] = React.useState(props.distance);
  const [startTime, setStartTime] = React.useState(props.startTime);
  const [endTime, setEndTime] = React.useState(props.endTime);

  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);

  const handleStartAgeChange = (event) => setStartAge(event.target.value);
  const handleEndAgeChange = (event) => setEndAge(event.target.value);

  const handleStartChildAmountChange = (event) => setStartChildAmount(event.target.value);
  const handleEndChildAmountChange = (event) => setEndChildAmount(event.target.value);

  const handleDistanceChange = (event, newValue) => setDistance(newValue);

  const handleStartTimeChange = (event) => setStartTime(event.target.value);
  const handleEndTimeChange = (event) => setEndTime(event.target.value);

  const buildFiltersObj = () => {
    return {
      startDate,
      endDate,
      startAge,
      endAge,
      startChildAmount,
      endChildAmount,
      distance,
      startTime,
      endTime
    }
  }

  return (
    <div style={{height: '100%'}}>
      <RTL>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <MapFilterForm>
                <FormHeader>
                  <span>סינון בקשות העזרה</span>
                  <CloseIcon onClick={props.onClose}/>
                </FormHeader>
                <FormRow>
                  <FormRowGroup style={{width: '100%'}}>
                    <label>
                      <EventIcon />
                      לפי טווח תאריכים
                    </label>
                    <FromRowInput>
                      <FormControl style={{width: '40%'}}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/DD/YYYY"
                          margin="normal"
                          id="date-picker-inline"
                          defaultValue={Date.now()}
                          value={startDate}
                          onChange={handleStartDateChange}
                        />
                      </FormControl>
                      <div style={{color: '#767676'}}>עד</div>
                      <FormControl style={{width: '40%'}}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/DD/YYYY"
                          margin="normal"
                          id="date-picker-inline"
                          defaultValue={Date.now()}
                          value={endDate}
                          onChange={handleEndDateChange}
                        />
                      </FormControl>
                    </FromRowInput>
                  </FormRowGroup>
                </FormRow>
                <FormRow>
                  <FormRowGroup style={{width: '45%'}}>
                    <label>
                      <FaBaby />
                      לפי טווח גילאי הילדים
                    </label>
                    <FromRowInput>
                      <FormControl style={{width: '40%'}}>
                        <Select
                          defaultValue={0}
                          value={startAge}
                          onChange={handleStartAgeChange}
                          MenuProps={MenuProps}
                        > 
                          {_.range(0, 121).map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div style={{color: '#767676'}}>עד</div>
                      <FormControl style={{width: '40%'}}>
                        <Select
                          defaultValue={0}
                          value={endAge}
                          onChange={handleEndAgeChange}
                          MenuProps={MenuProps}
                        >
                          {_.range(0, 121).map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FromRowInput>
                  </FormRowGroup>
                  <FormRowGroup style={{width: '45%'}}>
                    <label>
                      <IoIosPeople />
                      לפי כמות הילדים
                    </label>
                    <FromRowInput>
                      <FormControl style={{width: '40%'}}>
                        <Select
                          defaultValue={1}
                          value={startChildAmount}
                          onChange={handleStartChildAmountChange}
                          MenuProps={MenuProps}
                        >
                          {_.range(1, 11).map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div style={{color: '#767676'}}>עד</div>
                      <FormControl style={{width: '40%'}}>
                        <Select
                          defaultValue={1}
                          value={endChildAmount}
                          onChange={handleEndChildAmountChange}
                          MenuProps={MenuProps}
                        >
                          {_.range(1, 11).map((val) => (
                            <MenuItem key={val} value={val}>
                              {val}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FromRowInput>
                  </FormRowGroup>
                </FormRow>
                <FormRow>
                  <FormRowGroup style={{width: '100%'}}>
                  <label>
                    <TiLocationOutline />
                    לפי מרחק מכתובת המגורים שלך
                  </label>
                  <FromRowInput style={{padding: '1em', paddingTop: '1.5em'}}>
                    <IOSSlider 
                      aria-label="ios slider"
                      defaultValue={50}
                      value={distance}
                      marks={marks}
                      valueLabelDisplay="on"
                      onChange={handleDistanceChange}
                    />
                  </FromRowInput>
                  </FormRowGroup>
                </FormRow>
                <FormRow>
                  <FormRowGroup style={{width: '100%'}}>
                    <label>
                      <FaRegClock />
                      לפי טווח שעות
                    </label>
                    <FromRowInput>
                      <FormControl style={{width: '40%'}}>
                        <Select
                          value={startTime}
                          defaultValue={0}
                          onChange={handleStartTimeChange}
                          MenuProps={MenuProps}
                        >
                          {_.range(0, 24).map((val) => (
                            <MenuItem key={val} value={val}>
                              {padToTwo(val)}:00
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl style={{width: '40%'}}>
                        <Select
                          value={endTime}
                          defaultValue={0}
                          onChange={handleEndTimeChange}
                          MenuProps={MenuProps}
                        >
                          {_.range(0, 24).map((val) => (
                            <MenuItem key={val} value={val}>
                              {padToTwo(val)}:00
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </FromRowInput>
                  </FormRowGroup>
                </FormRow>
                <FormButtoms>
                  <Button onClick={(e) => props.handleApply(buildFiltersObj())} variant="contained" color="primary">סינון הבקשות</Button>
                  <Button onClick={(e) => props.handleApply()}>נקה</Button>
                </FormButtoms>
              </MapFilterForm>
            </MuiPickersUtilsProvider>
          </div>
        </ThemeProvider>
      </RTL>
    </div>
  )
}