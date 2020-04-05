import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import GridComp from '../Grid';

//#region Styles
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

    &:last-child {
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
  @media(max-width:450px){
    display:none;
  }
`;
//#endregion

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

const FindSessionsGridCommands = (props) => {
  return (
    <span className="grid-command">
      <ApplyComp onClick={(e) => props.onClick(e, props.data)}>
        הציעו עזרה
        {/* <AddCircleIcon /> */}
      </ApplyComp>
      {/* <AddCircleIcon
        style={{ height: '30px', width: '30px', color: '#53b493' }}
        onClick={(e) => props.onClick(e, props.data)} 
      />      */}
    </span>
  )
}
  
const ChildrenCellRenderer = (props) => {
  const prefix = window.location.origin;
  const hasOverflow = props.value.length > 5;
  const children = _.cloneDeep(props.value);
  const overflowLength = children.length - 5;
  
  return (
    <React.Fragment>
      {children.splice(0, 5).map(child => {
        let img = '';

        if (child.age < 3) img = 'child';
        else if (child.isFemale) img = 'girl';
        else img = 'boy';

        return (
          <img src={prefix + '/images/icons8_' + img + '_96px.png'} />
        )
      })}
      {hasOverflow ? `+ ${overflowLength}` : ``}
    </React.Fragment>
  )
}
  
export const FindSessionsGrid = (props) => {
  const [columnDefs] = useState([
    { 
      colId: "date",
      headerName: "תאריך",
      field: "date",
      valueFormatter: (params) => {
        let startTime = _.get(params.data, 'startTime');

        if (startTime) return startTime = moment(params.data.startTime).format("DD-MM-YY");

        return params.value;
      }
    },
    { 
      colId: "contact",
      headerName: "איש קשר",
      field: "contact.name"
    },
    {
      colId: "children",
      headerName: "ילדים",
      field: "children",
      cellRenderer: "childrenCellRenderer",
      valueGetter: (params) => {
        let children = _.get(params.data, 'doctor_o[0].children');

        if (children) return children;

        return params.value;
      }
    },
    {
      colId: "address",
      headerName: "כתובת",
      field: "address",
      valueGetter: (params) => {
        let address = _.get(params.data, 'doctor_o[0].address');

        if (address) {
          address = address.split(',');
          address = address[0] + ', ' + address[1];
          address = address.replace(/[0-9]/g, '');
  
          return address;
        }
        
        return params.value;
      }
    },
    {
      colId: "sessionHours",
      headerName: "שעות ההתנדבות",
      field: "sessionHours",
      valueGetter: (params) => {
        let startTime = _.get(params.data, 'startTime');
        let endTime = _.get(params.data, 'endTime');
      
        if (startTime && endTime) {
          startTime = moment(startTime);
          endTime = moment(endTime);

          return endTime.format("H:mm") + ' - ' + startTime.format("H:mm");
        }

        return params.value;
      }
    },
    {
      colId: "commands",
      headerName: "",
      field: "commands",
      cellRenderer: "findSessionsGridCommands",
      cellRendererParams: {
        onClick: props.openSessionDetails
      }
    }
  ]);

  const getColumnDefs = () => {
    if (props.isExpanded) {
      return columnDefs;
    } else {
      return _.filter(columnDefs, colDef => _.includes(['date', 'contact', 'sessionHours','commands'], colDef.colId));
    }
  }

  const onCellFocused = (event) => {
    const colId = _.get(event, 'column.colDef.colId');

    if (colId === 'commands') {
      event.api.gridOptionsWrapper.gridOptions.suppressRowClickSelection = true;
    } else {
      event.api.gridOptionsWrapper.gridOptions.suppressRowClickSelection = false;
    }
  }

  return (
    <GridWrapper>
      <GridHeaderComp>
        <img src={window.location.origin + '/images/icons8_today_96px_1.png'} />
        אז איפה אוכל לעזור ?
        <img 
          src={window.location.origin + '/images/icons8_filter_96px.png'}
          style={{ position: 'absolute', left: 0, cursor: 'pointer' }}
          onClick={props.openMapFilter}
        />
      </GridHeaderComp>
      <GridComp
        columnDefs={getColumnDefs()}
        rowData={props.availableSessions}
        frameworkComponents={{
          findSessionsGridCommands: FindSessionsGridCommands,
          childrenCellRenderer: ChildrenCellRenderer
        }}

        rowSelection='single'
        onRowSelected={props.onRowSelected}
        onCellFocused={onCellFocused}
      />
      <GridExpanderComp  onClick={props.onExpanderClick}>{props.isExpanded ? <ArrowForwardIosIcon /> :  <ArrowBackIosIcon />}</GridExpanderComp>
    </GridWrapper>
  )
};