import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import moment from 'moment';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import GridComp from '../Grid';
import {Map} from './Map';
import {BASE_URL} from '../../constants'

//#region Styles
const FindSessionComp = styled.div`
  height: 100%;
  padding: 100px 50px 50px 50px;
`;
const Wrapper = styled.div`
  height: 100%;
  max-width: 1366px;
  margin: auto;

  flex-grow: 10;
  flex-shrink: 0;
  flex-basis: auto;
  display: flex;
`;
const TableWrapper = styled.div`
  min-width: 33.3%;

  flex-basis: ${props => props.isExpanded ? "66.7%" : "33.3%"};
  transition: flex-basis 500ms ease-in-out;
`;
const MapWrapper = styled.div`
  min-width: 33.3%;

  flex-basis: ${props => props.isExpanded ? "33.3%" : "66.7%" };
  transition: flex-basis 500ms ease-in-out;

  position: relative;
`;
const GridWrapper = styled.div`
  background: #fff;
  height: 100%;
  width: calc(100% + 8px);
  border-radius: 8px;
  position: relative;
  z-index: 1;

  & .grid-wrapper {
    height: calc(100% - 47px);
  }

  @media(max-width:450px) {
    width: 100%;
    margin-bottom: 10px;

    &:last-child: {
      margin-bottom: 0;
    }
  }
`;
const GridHeaderComp = styled.div`
  height: 27px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  font-size: 20px;

  position: relative;
  z-index : 1;

  img {
    width: 27px;
    height: 27px;
    padding-left: 10px;
  }

  &:before {
    content: "";
    position: absolute;
    left: 15px;
    bottom: 0;
    height: 1px;
    width: calc(100% - 30px);
    border-bottom: 1px solid #D1D1D1;
  }
`;
const GridExpanderComp = styled.div`
  position: absolute;
  top: 50%;
  left: -27px;
  padding: 10px 5px;
  background: #fff;
  border-radius: 8px;
`;
//#endregion

const FindSessionsGridCommands = (props) => {
  const prefix = window.location.origin
  const onClick = (event) => {
    console.log(event);
  }

  return (
    <span className="grid-command">
      <AddCircleIcon
        style={{ height: '30px', width: '30px', color: '#53b493' }}
        onClick={onClick} 
      />     
    </span>
  )
}

const FindSessionsGrid = (props) => {
  const [columnDefs] = useState([
    { 
      colId: "date",
      headerName: "תאריך",
      field: "date",
      valueFormatter: (params) => {
        const startTime = moment(params.value);
        return startTime.format("DD-MM-YY");
      }
    },
    { 
      colId: "contact",
      headerName: "איש קשר",
      field: "contact"
    },
    {
      colId: "children",
      headerName: "ילדים",
      field: "children",
      valueGetter: (params) => {
        return params.data.doctor_o[0].children.length;
      }
    },
    {
      colId: "address",
      headerName: "כתובת",
      field: "address",
      valueGetter: (params) => {
        let address = params.data.doctor_o[0].address;
        address = address.split(',');
        address = address[0] + ', ' + address[1];
        address = address.replace(/[0-9]/g, '');

        return address;
      }
    },
    {
      colId: "sessionHours",
      headerName: "שעות ההתנדבות",
      field: "sessionHours",
      valueGetter: (params) => {
        let {startTime, endTime} = params.data;

        startTime = moment(startTime);
        endTime = moment(endTime);

        return endTime.format("H:mm") + ' - ' + startTime.format("H:mm");
      }
    },
    {
      colId: "commands",
      headerName: "",
      field: "commands",
      width: 70,
      cellRenderer: "findSessionsGridCommands"
    }
  ]);

  const getColumnDefs = () => {
    if (props.isExpanded) {
      return columnDefs;
    } else {
      return _.filter(columnDefs, colDef => _.includes(['date', 'contact', 'sessionHours'], colDef.colId));
    }
  }

  return (
    <GridComp
      columnDefs={getColumnDefs()}
      rowData={props.availableSessions}
      frameworkComponents={{
        findSessionsGridCommands: FindSessionsGridCommands
      }}
      onRowDoubleClicked={props.handleDoubleClicked	}
    />
  )
};

export const FindSession = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 32.344084 , lng: 34.870139});

  useEffect(() => {
    Axios.get(BASE_URL+'/api/session/getavailablesessions/5e7ca72c343daa68c8d7277f').then(result => {
      setAvailableSessions(result.data);
    })
  }, []);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const handleDoubleClicked	 = (event) => {
    const {lat, lon} = event.data.doctor_o[0];

    setMapCenter({lat: lat, lng: lon});
  }

  return (
    <FindSessionComp>
      <Wrapper>
        <TableWrapper isExpanded={isExpanded}>
          <GridWrapper>
            <GridHeaderComp>
              <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
              ההתנדבויות הבאות שלי
            </GridHeaderComp>
            <FindSessionsGrid
              isExpanded={isExpanded}
              availableSessions={availableSessions}
              handleDoubleClicked={handleDoubleClicked}
            />
            <GridExpanderComp  onClick={toggleIsExpanded}>{isExpanded ? <ArrowForwardIosIcon /> :  <ArrowBackIosIcon />}</GridExpanderComp>
          </GridWrapper>
        </TableWrapper>
        <MapWrapper isExpanded={isExpanded}>
          <Map 
            ownLocation={{lat: 32.344084 , lng: 34.870139}}
            mapCenter={mapCenter}
            availableSessions={availableSessions}
          />
        </MapWrapper>
      </Wrapper>
    </FindSessionComp>
  )
}