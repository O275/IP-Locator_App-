import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Select, MenuItem } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

const Map = ({ lat, lon }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      console.error('Mapbox API key is missing');
      return;
    }

    const initializedMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lon, lat],
      zoom: 9,
      accessToken: API_KEY,
    });

    new mapboxgl.Marker()
      .setLngLat([lon, lat])
      .addTo(initializedMap);

    setMap(initializedMap);

    return () => initializedMap.remove();
  }, [lat, lon]);

  const handleStyleChange = (style) => {
    if (map) {
      map.setStyle(`mapbox://styles/mapbox/${style}`);
    }
  };

  return (
    <div>
      <Select onChange={(e) => handleStyleChange(e.target.value)} >
        <MenuItem value="streets-v12">Streets</MenuItem>
        <MenuItem value="satellite-v9">Satellite</MenuItem>
        <MenuItem value="terrain-v2">Terrain</MenuItem>
        <MenuItem alue="light-v10">Light</MenuItem>
        <MenuItem value="dark-v10">Dark</MenuItem>
      </Select>
      <div className="map-container" ref={mapContainerRef}></div>
    </div>
  );
};

export default Map;



