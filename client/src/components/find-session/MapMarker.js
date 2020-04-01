import React, { Component, Fragment, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';

import ScheduleIcon from '@material-ui/icons/Schedule';
import EventIcon from '@material-ui/icons/Event';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//#region Styles
const MarkerComp = styled.div`
  border: 1px solid white;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  background-color: blue;
  cursor: pointer;
  zIndex: 10;
`;
const InfoWindowComp = styled.div`
  position: relative;
  bottom: 100px;
  left: 78.5px;
  height: 55px;
  width: 150px;
  background-color: white;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
  padding: 10px;
  fontSize: 14px;
  zIndex: 100;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }
`;
const DateTimeComp = styled.div`
  display: flex;
  font-size: 11px;
  justify-content: space-evenly;

  div {
    display: flex;
  }

  svg {
    height: 11px;
    width: 11px;
  }
`;
const ApplyComp = styled.div`
  font-size: 13px;  
  color: #53b493;
  cursor: pointer;

  display: flex;
  justify-content: center;

  svg {
    height: 16px;
    width: 16px;
    padding-inline-start: 5px;
  }
`;
//#endregion

const InfoWindow = React.forwardRef((props, ref) => {
  const {session} = props;
  
  const doctorName = session.doctor_o[0].firstName + ' ' + session.doctor_o[0].lastName
  const startTime = moment(session.startTime);
  const endTime = moment(session.endTime);
  
  return (
    <InfoWindowComp ref={ref}>
      <div style={{ fontSize: 15 }}>
        {doctorName}
      </div>
      <DateTimeComp>
        <div><ScheduleIcon />{endTime.format("H:mm") + ' - ' + startTime.format("H:mm")}</div>
        <div><EventIcon />{startTime.format("DD-MM-YY")}</div>
      </DateTimeComp>
      <ApplyComp onClick={() => console.log('Apply to session')}>
        הציעו עזרה
        <AddCircleIcon />
      </ApplyComp>
    </InfoWindowComp>
  );
});
 
export default class Marker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.toggle = this.toggle.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.refInfoWindow = React.createRef();
  }

  toggle() {
    const {isOpen} = this.state;

    if (!isOpen) {
      document.addEventListener('mousedown', this.handleClickOutside, false);
    } else {
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    this.setState({isOpen: !isOpen});
  }

  handleClickOutside(event) {
    if (this.refInfoWindow.current.contains(event.target)) {
      return;
    }

    this.toggle();
  };

  render() {
    return (
      <Fragment>
        <MarkerComp onClick={this.toggle} />
        {this.state.isOpen && <InfoWindow ref={this.refInfoWindow} {...this.props} />}
      </Fragment>
    )
  }
}
