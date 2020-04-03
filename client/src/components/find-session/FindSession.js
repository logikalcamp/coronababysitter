import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Axios from 'axios';

import {FindSessionsGrid} from './FindSessionGrid';
import {Map} from './Map';
import {SessionDetailsModal} from './SessionDetailsModal';

import {MapFilterModal} from './MapFilterModal';

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

const FindSession = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [availableSessions, setAvailableSessions] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: props.auth.user.lat , lng: props.auth.user.lon});
  const [modalData, setModalData] = useState(undefined);
  const [filters, setFilters] = useState();

  useEffect(() => {
    const volunteerId = props.auth.user._id;
    
    Axios.get(BASE_URL+'/api/session/getavailablesessions/' + volunteerId).then(result => {
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
    Axios.post(BASE_URL+'/api/session/addrequest/' + session._id, {volunteerId:props.auth.user._id})
    .then(response => {
      setModalData({
        type: SESSION_DETAILS_MODAL,
        session
    });
    })
    .catch(error => {
      console.log(error);
    });
  }

  const openMapFilter = (event) => {
    setModalData({
      type: MAP_FILTER_MODAL
    });
  }

  const applyFilters = (filtersObj) => {
    console.log(filtersObj);

    setFilters(filtersObj);
    setModalData(undefined);
  }

  const getModal = () => {
    let retVal = '';

    if (modalData && modalData.type) {
      switch(modalData.type) {
        case SESSION_DETAILS_MODAL:
          retVal = <SessionDetailsModal />;
          break;

        case MAP_FILTER_MODAL:
          retVal = <MapFilterModal {...filters} handleApply={applyFilters} onClose={(e) => setModalData(undefined)}/>;
          break;

        default:
          retVal = '';
      }
    }

    return retVal;
  }

  const getAvailableSessions = () => {
    const filteredAvailableSessions = _.filter(session => {
      /*const startDate;
      const endDate;
      const startAge;
      const endAge;
      const startChildAmount;
      const endChildAmount;
      const distance;
      const startTime;
      const endTime;*/

      debugger;
      return true;
    })

    return availableSessions;
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

            availableSessions={getAvailableSessions()}
          />
        </TableWrapper>
        <MapWrapper isExpanded={isExpanded}>
          <Map 
            ownLocation={{lat: props.auth.user.lat , lng: props.auth.user.lon}}
            mapCenter={mapCenter}
            openSessionDetails={openSessionDetails}

            availableSessions={getAvailableSessions()}
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

const ToProps = (state,props) => {
  return {
      auth: state.auth
  }
}
export default connect(ToProps)(FindSession);