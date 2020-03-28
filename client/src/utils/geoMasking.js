import * as turf from '@turf/turf'

export default function GeoMasking() {
  console.log('GeoMasking');

  const point = turf.point([-90.548630, 14.616599]);
  const buffered = turf.buffer(point, 500, {units: 'miles'});

  const randomPointInPolygon = Math.floor(Math.random() * buffered.geometry.coordinates[0].length); 
  const point1 = turf.point(buffered.geometry.coordinates[0][randomPointInPolygon]);

  const maskPoint = turf.midpoint(point, point1);

  return [point, point1, maskPoint];
}