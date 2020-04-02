import _ from 'lodash';
import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
 
import Marker from './MapMarker';

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const handleApiLoaded = (map, maps, ownLocation) => {
  new maps.Marker({
    position: {
      lat: ownLocation.lat,
      lng: ownLocation.lng,
    },
    map
  });
}

export const Map = (props) => {
  return (
    <MapWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBWjEJbDvBvWtKFaV6Nf_1HCPZnJTmWHDQ" }}
        center={props.mapCenter}
        defaultZoom={15}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, props.ownLocation)}
      >
        {props.availableSessions.map(session => 
          <Marker
            key={session._id}
            lat={_.get(session.doctor_o[0], 'lat')}
            lng={_.get(session.doctor_o[0], 'lon')}
            
            session={session}
            openSessionDetails={props.openSessionDetails}
          />)}
      </GoogleMapReact>
    </MapWrapper>
  )
};