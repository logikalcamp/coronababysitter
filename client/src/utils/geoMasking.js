import * as turf from '@turf/turf'

export default function GeoMasking(lat,lng) {

  const point = turf.point([lat, lng]);
  const buffered = turf.buffer(point, 0.5, {units: "kilometers"});

  const randomPointInPolygon = Math.floor(Math.random() * buffered.geometry.coordinates[0].length); 
  const point1 = turf.point(buffered.geometry.coordinates[0][randomPointInPolygon]);

  const maskPoint = turf.midpoint(point, point1);

  return  maskPoint;
}