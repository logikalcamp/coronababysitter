import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

import {FindSessionsGrid} from './FindSessionGrid';
import {Map} from './Map';
import {SessionDetailsModal} from './SessionDetailsModal';

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
const ModalCon = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0, 0.4);

  display:  ${props=> props.open ? "block" : "none"};
`;
const ModalContentCon = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 450px;
  height: 100%;
  background-color: #ffffff;

  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);

  animation: ${props=> props.open ? "slide-in 0.5s forwards" : "slide-out 0.5s forwards"};
  -webkit-animation: ${props=> props.open ? "slide-in 0.5s forwards" : "slide-out 0.5s forwards"};

  @keyframes slide-in {
    100% { transform: translateX(0%); }
  }
  
  @-webkit-keyframes slide-in {
    100% { -webkit-transform: translateX(0%); }
  }
      
  @keyframes slide-out {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
  }
  
  @-webkit-keyframes slide-out {
    0% { -webkit-transform: translateX(0%); }
    100% { -webkit-transform: translateX(-100%); }
  }
`;
//#endregion

const SESSION_DETAILS_MODAL = 'SESSION_DETAILS_MODAL';
const MAP_FILTER_MODAL = 'MAP_FILTER_MODAL';

export const FindSession = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 32.344084 , lng: 34.870139});
  const [modalData, setModalData] = useState(undefined);

  useEffect(() => {
    Axios.get(BASE_URL+'/api/session/getavailablesessions/5e7ca72c343daa68c8d7277f').then(result => {
      setAvailableSessions(result.data);
    })
  }, []);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  }

  const handleRowSelected	 = (event) => {
    const {lat, lon} = event.data.doctor_o[0];

    setMapCenter({lat: lat, lng: lon});
  }

  const openSessionDetails = (event, session) => {
    setModalData({
      type: SESSION_DETAILS_MODAL,
      session
    });
  }

  const openMapFilter = (event) => {
    setModalData({
      type: MAP_FILTER_MODAL
    });
  }

  const getModal = () => {
    let retVal = '';

    if (modalData && modalData.type) {
      switch(modalData.type) {
        case SESSION_DETAILS_MODAL:
          retVal = 'Session Details';
          break;

        case MAP_FILTER_MODAL:
          retVal = <SessionDetailsModal />;
          break;

        default:
          retVal = '';
      }
    }

    return retVal;
  } 

  return (
    <FindSessionComp>
      <Wrapper>
        <TableWrapper isExpanded={isExpanded}>
          <FindSessionsGrid
            isExpanded={isExpanded}
            onExpanderClick={toggleIsExpanded}
            onRowSelected={handleRowSelected}
            openSessionDetails={openSessionDetails}
            openMapFilter={openMapFilter}

            availableSessions={availableSessions}
          />
        </TableWrapper>
        <MapWrapper isExpanded={isExpanded}>
          <Map 
            ownLocation={{lat: 32.344084 , lng: 34.870139}}
            mapCenter={mapCenter}
            openSessionDetails={openSessionDetails}

            availableSessions={availableSessions}
          />
        </MapWrapper>
        <ModalCon open={modalData && modalData.type !== ''} onClick={() => setModalData(undefined)}/>
        <ModalContentCon open={modalData && modalData.type !== ''}>
          {getModal()}
        </ModalContentCon>
      </Wrapper>
    </FindSessionComp>
  )
}