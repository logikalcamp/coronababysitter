const { compose, withProps, lifecycle } = require("recompose");
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";
import React from 'react';
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
import {connect} from 'react-redux';

  const Searchi = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBWjEJbDvBvWtKFaV6Nf_1HCPZnJTmWHDQ&v=3.exp&libraries=geometry,drawing,places&language=iw",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
      }),
      lifecycle({
        componentWillMount() {
          const refs = {}
          this.setState({
            places: [],
            lat:undefined,
            lng:undefined,
            a : false,
            onSearchBoxMounted: ref => {
              refs.searchBox = ref;
              
            },
            onPlacesChanged: () => {
                const places = refs.searchBox.getPlaces();
                let lati = places[0].geometry.location.lat();
                let lngi = places[0].geometry.location.lng();
                let pl = places[0].formatted_address;
                return [lati,lngi,pl]   
            },
          })
        },
      }),
      withScriptjs  
      )(props =>
        {
          return(
            <div data-standalone-searchbox="">
          <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={()=>{
               let arr = props.onPlacesChanged()
               props.shay(arr[0],arr[1])
              }}
          >
            <input
              type="text"
              placeholder="Type in location..."
            />
          </StandaloneSearchBox>
        </div>
          )
        }
          
        
    );
export default Searchi;