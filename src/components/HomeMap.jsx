import { useEffect, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import iconFigueira from "../imgs/icones/PinFigueira.png"

import "leaflet/dist/leaflet.css";
// Retrieve all Leaflet Default Icon options from CSS, in particular all icon images URL's, to improve compatibility with bundlers and frameworks that modify URL's in CSS.
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from 'leaflet';
const fs = require("fs");


function GetIcon() {
  console.log();
  return L.icon({
    iconUrl: iconFigueira
  });

}

const HomeMap = () => {
  const center = [40.39, -8.8583];
  const posFigueira = [40.1499, -8.8593];
  const posEriceira = [38.9629, -9.4211];

  const zoom = 7;

  const [geodata, setGeodata] = useState(null);
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(
    map ? map.getCenter() : { lat: center[0], lng: center[1] }
  );

  const { BaseLayer, Overlay } = LayersControl;

  // See: https://react-leaflet.js.org/docs/example-external-state/
  const DisplayPosition = (props) => {
    const onClick = useCallback(() => {
      props.map.setView(center, zoom);
    }, [props.map]);

    const onMove = useCallback(() => {
      setPosition(props.map.getCenter());
    }, [props.map]);

    useEffect(() => {
      props.map.on("move", onMove);
      return () => {
        props.map.off("move", onMove);
      };
    }, [props.map, onMove]);

    return (
      <div>
        Marker at (lat, lon): ({position.lat.toFixed(4)},{" "}
        {position.lng.toFixed(4)} )<button onClick={onClick}>reset</button>
      </div>
    );
  };

  return (
    <>
      {map ? (
        <DisplayPosition
          map={map}
          position={position}
          setPosition={setPosition}
        />
      ) : null}

      <MapContainer
        center={center}
        zoom={zoom}
        maxZoom={10}
        scrollWheelZoom={true}
        style={{ width: "100vw", height: "100vh" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          // icon={GetIcon()}
          class="testeIcon"
          id="markerFigueira"
          position={posFigueira}
          eventHandlers={{
            click: () => {
              console.log('marker Fig clicked');
              // window.location.href = "/homeFigueira";
            },
          }}
        ></Marker>
        <Marker
          id="markerEriceira"
          position={posEriceira}
          eventHandlers={{
            click: () => {
              console.log('marker Eri clicked');
              // window.location.href = "/homeEriceira";
            },
          }}
        ></Marker>

      </MapContainer>
    </>
  );
};

export default HomeMap;
