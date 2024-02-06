"use client";

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function MapSection() {
  const position = { lat: 13.04, lng: 80.27 };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}>
      <Map
        zoom={10}
        center={position}
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
        className="map"
      >
        <AdvancedMarker position={position}></AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
