"use client"

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import map from '../ideib_islands_4326.json';

import React from "react";

import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";

export default function Map() {
	return (
		<MapContainer style={{width: '100%', height: '100vh'}} center={[39.37029,2.75802]} zoom={9} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				// url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
			/>
	      <GeoJSON data={map} />
		</MapContainer>
	);
}