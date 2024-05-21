"use client"

import map from '../ideib_islands_4326.json';
import rpoints from '../json_random.json';
import React, {useRef, useEffect, useState} from 'react';
import Map, {Layer, Marker, Source} from 'react-map-gl/maplibre';

const style = {
	version: 8,
	sources: {
		osm: {
			type: 'raster',
			tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
			tileSize: 256,
			attribution: '&copy; OpenStreetMap Contributors',
			maxzoom: 19
		},
		terrainSource: {
			type: 'raster-dem',
			tiles: ['/PRova/{z}/{x}/{y}.png'],
			tileSize: 256,
			maxzoom: 16
		},
		// hillshadeSource: {
		// 	type: 'raster-dem',
		// 	tiles: ['/mar/{z}/{x}/{y}.png'],
		// 	tileSize: 256
		// },
		// terrainSource: {
		//     type: 'raster-dem',
		//     url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
		//     tileSize: 256
		// },
		// hillshadeSource: {
		//     type: 'raster-dem',
		//     url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
		//     tileSize: 256
		// }
	},
	layers: [
		{
			id: 'osm',
			type: 'raster',
			source: 'osm'
		},
		{
			id: 'hills',
			type: 'hillshade',
			source: 'terrainSource',
			layout: {visibility: 'visible'},
			// paint: {'hillshade-shadow-color': 'rgba(41,3,210,0.85)'}
		}
	],
	terrain: {
		source: 'terrainSource',
		exaggeration: 1
	}
};

const dataLayer = {
	id: 'data',
	type: 'symbol',
	paint: {
		'fill-color': {
			property: 'percentile',
			stops: [
				[0, '#3288bd'],
				[1, '#66c2a5'],
				[2, '#abdda4'],
				[3, '#e6f598'],
				[4, '#ffffbf'],
				[5, '#fee08b'],
				[6, '#fdae61'],
				[7, '#f46d43'],
				[8, '#d53e4f']
			]
		},
		'fill-opacity': .1
	}
};


export default function MapLibre({data}) {
	const [lng] = useState(2.75802);
	const [lat] = useState(39.37029);
	const [zoom] = useState(8);
	const mapRef = useRef();

	function flyTo(layer) {
		const i = Math.floor(Math.random() * data[layer].features.length);
		mapRef.current?.flyTo({
			center: data[layer].features[i].geometry.coordinates,
			zoom: 15,
			pitch: 60,
			bearing: Math.random() * 360,
			duration: 2000,
			essential: true
		})
	}

	function renderData(data) {
		console.log(data)
		if (!data) {
			return undefined;
		}

		return (
			<Source id="my-data-2" type="geojson" data={data} cluster={false}>
				<Layer
					id="point-2"
					type="circle"
					paint={{
						// 'circle-radius': 5,
						// 'circle-color': 'rgba(133,28,231,0.8)',
						'circle-color': [
							'step',
							['get', 'point_count'],
							'#51bbd6',
							100,
							'#f1f075',
							750,
							'#f28cb1'
						],
						'circle-radius': [
							'step',
							['get', 'point_count'],
							20,
							100,
							30,
							750,
							40
						]
					}}
				/>
			</Source>
		);
	}

	return (
		<Map ref={mapRef} initialViewState={{longitude: lng, latitude: lat, zoom: zoom}} mapStyle={style}
		     onClick={() => flyTo(0)}>
			{/*<Source id="layers" type="geojson" data={map}>*/}
			{/*	<Layer*/}
			{/*		id="polygons-layer"*/}
			{/*		type="fill"*/}
			{/*		paint={{*/}
			{/*			'fill-color': '#088',*/}
			{/*			'fill-opacity': 0.8*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*	/!*	/!*<Layer {...skyLayer} />*!/*!/*/}
			{/*</Source>*/}
			{
				data && data.map(layer => renderData(layer))
			}
		</Map>
	);
}