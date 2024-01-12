import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Map() {

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
  });
  if (!isLoaded) return <div>Loading....</div>;
  return (
    <GoogleMap
      mapContainerClassName="map"
      zoom={8}
      center={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
  );
}
