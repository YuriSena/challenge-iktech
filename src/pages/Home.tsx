import { useCallback, useEffect, useMemo, useState } from "react";
import { GiSailboat } from "react-icons/gi";
import { api } from "../services/axios";
import ReactMapGL, { Marker } from "react-map-gl";

import "../styles/home.scss";

type ViewportProps = {
  latitude: number;
  longitude: number;
  width: string;
  height: string;
  zoom: number;
};

type BoatProps = {
  id: string;
  latitude: number;
  longitude: number;
  complete: string;
  country: string;
  from: string;
  name: string;
  size: number;
  speed: string;
  to: string;
  type: string;
};

type MapProps = {
  boatList: BoatProps[] | null;
  viewport: Object;
  setViewport(prev: ViewportProps): void;
};

const HandleMap = ({ boatList, viewport, setViewport }: MapProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [boatId, setBoatId] = useState("");

  const handleBoatId = (boatId: string) => {
    setIsOpen(!isOpen);
    setBoatId(boatId);
  };
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/yurizeras/ckynjtr6m1ayp14mmnmvfh3mw"
      onViewportChange={(viewport: ViewportProps) => {
        setViewport(viewport);
      }}
      onClick={() => setIsOpen(false)}
    >
      {boatList?.map((boat: BoatProps, index) => (
        <Marker
          key={boat.id}
          latitude={boat.latitude}
          longitude={boat.longitude}
        >
          <GiSailboat
            className="boat"
            color="#fff"
            fontSize={35}
            onClick={() => handleBoatId(boat.id)}
          />
          {isOpen && boatId === boat.id && (
            <div className="boat-details" key={boat.id}>
              <h3>Boat information</h3>
              <span>Name: {boat.name}</span>
              <span>Size: {boat.size}</span>
              <span>Speed: {boat.speed}</span>
              <span>Country: {boat.country}</span>
              <span>From: {boat.from}</span>
              <span>To: {boat.to}</span>
              <span>Complete: {boat.complete}</span>
              <span>Latitude: {boat.latitude}</span>
              <span>Longitude: {boat.longitude}</span>
            </div>
          )}
        </Marker>
      ))}
    </ReactMapGL>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boatList, setBoatList] = useState<[] | null>([]);
  const [viewport, setViewport] = useState<ViewportProps>({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  const handleBoatList = useCallback(async () => {
    setIsLoading(true);
    await api
      .get("/")
      .then((res) => {
        setBoatList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        return err;
      });
  }, []);

  useEffect(() => {
    handleBoatList();
  }, [handleBoatList]);

  const memo = useMemo(() => {
    return boatList;
  }, [boatList]);

  return (
    <>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <HandleMap
          boatList={memo}
          viewport={viewport}
          setViewport={setViewport}
        />
      )}
    </>
  );
};

export default Home;
