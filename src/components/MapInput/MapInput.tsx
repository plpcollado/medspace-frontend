"use client";

import React from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapInput() {
  const map = new maplibregl.Map({
    container: "map", // container id
    style: "https://demotiles.maplibre.org/style.json", // style URL
    center: [0, 0], // starting position [lng, lat]
    zoom: 1, // starting zoom
  });

  return <div id="map"></div>;
}
