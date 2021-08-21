import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';

function Map({ searchResults }) {
  //selecyed location state for the map
  const [selectedLocation, setSelectedLocation] = useState({});

  //Tranform searchResults to be used with geolib (to match requirements)
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //centre map arround pins
  const center = getCenter(coordinates);
  const [viewPort, setViewPort] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  console.log(center);
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/meezdev/cksjwmc5g0vlz17nwv96o6acm"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewPort}
      onViewportChange={(nextViewPort) => setViewPort(nextViewPort)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-pulse"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>

          {/* the popup that shows if marker clicked for a location */}
          {selectedLocation.long === result.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={result.lat}
              longitude={result.long}
            >
              <div className="h-32 w-36">
                <Image
                  src={result.img}
                  layout="fill"
                  className="px-0"
                  objectFit="fill"
                />
                <p className="absolute text-red-400 z-50">{result.title}</p>
              </div>
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
