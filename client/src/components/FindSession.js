import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const FindSessionComp = styled.div`
  height: 100%;
  width: calc(100% - 200px);
  padding: 100px;

  max-width: 1366px;
  margin: auto;

  display: flex;
  justify-content: space-around;
`;

const TableComp = styled.div`
  width: 33.3%;
`;

const MapComp = styled.div`
  width: 66.7%;
`;

const Map = withScriptjs(withGoogleMap(props =>
  <GoogleMap
  streetView = {false}
  defaultZoom={11}
  center={{ lat: 32.344084 , lng: 34.870139 }}
  >
    <Marker
      position={{ lat: 32.344084 , lng: 34.870139 }}
    />
  </GoogleMap>
));

export const FindSession = (props) => {
  return (
    <FindSessionComp>
      <TableComp>Table</TableComp>
      <MapComp>
      <Map    
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWjEJbDvBvWtKFaV6Nf_1HCPZnJTmWHDQ&v=3.exp&libraries=geometry,drawing,places&language=iw"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      </MapComp>
    </FindSessionComp>
  )
}