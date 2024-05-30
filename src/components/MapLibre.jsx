"use client"

import React, {useRef, useState} from 'react';
import Map, {Layer, Source, NavigationControl} from 'react-map-gl/maplibre';

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
		hillshadeSource: {
			type: 'raster-dem',
			tiles: ['/PRova/{z}/{x}/{y}.png'],
			tileSize: 256,
		},
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
			source: 'hillshadeSource',
			layout: {visibility: 'visible'},
			paint: {'hillshade-shadow-color': 'rgba(6,46,98,1)'}
		}
	],
	terrain: {
		source: 'terrainSource',
		exaggeration: 1,
	}
};


export default function MapLibre({data, children, nav= true}) {
	const [lng] = useState(2.75802);
	const [lat] = useState(39.37029);
	const [zoom] = useState(8);
	const mapRef = useRef();

	function flyTo(layer) {
		const i = Math.floor(Math.random() * data[layer].features.length);
		mapRef.current?.flyTo({
			center: data[layer].features[i].geometry.coordinates,
			zoom: 13,
			pitch: 60,
			bearing: Math.random() * 360,
			duration: 2000,
			essential: true
		})
	}

	function PointsSource({data, idx}) {
		if (!data) {
			return undefined;
		}

		return (
			<Source id={`source-points-${idx}`} type="geojson" data={data} cluster={false}>
				<Layer
					id={`points-${idx}`}
					type="circle"
					paint={{
						'circle-radius': 5,
						'circle-color': `rgba(${randomColor()},${randomColor()},${randomColor()},.8)`,
						// 'circle-color': `#${Math.floor(Math.random()*16777215).toString(16)}`,
					}}
				/>
			</Source>
		);
	}

	function randomColor() {
		return Math.floor(Math.random()*255)
	}

	return (
		<Map ref={mapRef} initialViewState={{longitude: lng, latitude: lat, zoom: zoom}} mapStyle={style}
		     onClick={() => nav && flyTo(0)}>
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
				data && data.map((el, idx) => {
					return (
						<PointsSource key={idx} idx={idx} data={el}/>
					)
				})
			}
			{nav && <NavigationControl showCompass={true} visualizePitch={true} showZoom={true}/>}
			{children}
		</Map>
	);
}