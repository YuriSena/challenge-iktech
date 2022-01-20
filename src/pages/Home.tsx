import { useMemo, useState } from "react";
import { api } from "../services/axios";
import ReactMapGL from "react-map-gl";

const Home = () => {
  const [viewport, setViewport] = useState({
    latitude: 30.316922833844433,
    longitude: -119.14950216615557,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  useMemo(async () => {
    const res = await api.get("/");
    console.log(res);
  }, []);

  return <ReactMapGL {...viewport}>markers here</ReactMapGL>;
};

export default Home;
