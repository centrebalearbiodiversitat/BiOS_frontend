"use client"

import React, {useRef, useState} from 'react';
import Map, {Layer, Source, NavigationControl} from 'react-map-gl/maplibre';

const style = {
	version: 8,
	sources: {
		osm: {
			type: 'raster',
			// tiles: ['https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}'],
			// tiles: ['https://www.ign.es/wmts/pnoa-ma?layer=OI.OrthoimageCoverage&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}'],
			tiles: ['https://wmts-mapa-lidar.idee.es/lidar?layer=EL.GridCoverageDSM&style=default&tilematrixset=EPSG%3A3857&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}'],
			// tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
			tileSize: 256,
		},
		terrainSource: {
			type: 'raster-dem',
			tiles: ['/PRova/{z}/{x}/{y}.png'],
			tileSize: 256,
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
            id: 'background',
            type: 'background',
            paint: { 'background-color': '#ACD1D2' }
          },
		{
			id: 'osm',
			type: 'raster',
			source: 'osm'
		},
		{
			id: 'hills',
			type: 'hillshade',
			source: 'hillshadeSource',
			paint: {'hillshade-shadow-color': 'rgba(6,46,98,1)'}
		},
		// {
		// 	id: 'water-layer',
		// 	type: 'hillshade',
		// 	source: 'marSource',
		// 	paint: {
		// 		'hillshade-color': '#00ffff',
		// 		'hillshade-opacity': 0.5
		// 	}
		// },
	],
	terrain: {
		source: 'terrainSource',
		exaggeration: 1,
	}
};


export default function MapLibre({data, children, onClick = null, nav = true}) {
	const [lng] = useState(2.75802);
	const [lat] = useState(39.37029);
	const [zoom] = useState(7);
	const [bearing] = useState(-8);
	const [pitch] = useState(0);
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

		const rR = Math.floor(Math.random() * 255);
		const rG = Math.floor(Math.random() * 255);
		const rB = Math.floor(Math.random() * 255);

		return (
			<Source id={`source-points-${idx}`} type="geojson" data={data} cluster={false}>
				<Layer
					id={`points-${idx}`}
					type="heatmap"
					// type="heatmap"
					// paint={{
					// 	'circle-radius': 5,
					// 	'circle-color': `rgba(${randomColor()},${randomColor()},${randomColor()},.8)`,
					// 	// 'circle-color': `rgba(252, 186, 3)`,
					// 	// 'circle-color': `#${Math.floor(Math.random()*16777215).toString(16)}`,
					// }}
					paint={{
	                    // Increase the heatmap weight based on frequency and property magnitude
	                    'heatmap-weight': [
	                        'interpolate',
	                        ['linear'],
	                        ['get', 'mag'],
	                        0,
	                        0,
	                        6,
	                        1
	                    ],
	                    // Increase the heatmap color weight weight by zoom level
	                    // heatmap-intensity is a multiplier on top of heatmap-weight
	                    // 'heatmap-intensity': [
	                    //     'interpolate',
	                    //     ['linear'],
	                    //     ['zoom'],
	                    //     0,
	                    //     1,
	                    //     9,
	                    //     3
	                    // ],
	                    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
	                    // Begin color ramp at 0-stop with a 0-transparancy color
	                    // to create a blur-like effect.
	                    'heatmap-color': [
	                        'interpolate',
	                        ['linear'],
	                        ['heatmap-density'],
	                        0,
	                        `rgba(${rR},${rG},${rB},0)`,
	                        0.2,
	                        `rgba(${rR},${rG},${rB},0.2)`,
	                        0.4,
	                        `rgba(${rR},${rG},${rB},0.4)`,
	                        0.6,
	                        `rgba(${rR},${rG},${rB},0.6)`,
	                        0.8,
	                        `rgba(${rR},${rG},${rB},0.8)`,
	                        1,
	                        `rgba(${rR},${rG},${rB},1)`,
	                    ],
	                    // Adjust the heatmap radius by zoom level
	                    'heatmap-radius': [
	                        'interpolate',
	                        ['linear'],
	                        ['zoom'],
	                        0,
	                        2,
	                        9,
	                        20
	                    ],
						'heatmap-opacity': 0.7
	                    // Transition from heatmap to circle layer by zoom level
	                    // 'heatmap-opacity': [
	                    //     'interpolate',
	                    //     ['linear'],
	                    //     ['zoom'],
	                    //     7,
	                    //     1,
	                    //     9,
	                    //     0
	                    // ]
	                }
	            }
				/>
			</Source>
		);
	}

	return (
		<Map ref={mapRef} initialViewState={{longitude: lng, latitude: lat, zoom, bearing: bearing, pitch}} mapStyle={style}
		     interactiveLayerIds={['points-0', 'points-1']} style={{flex: 1}}
		     doubleClickZoom={false} onDblClick={(e) => nav && flyTo(0)}
		     onClick={e => onClick && onClick(e.features.length === 0 ? null : e.features[0])}>
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
			{nav && <NavigationControl showCompass={true} position="bottom-right" visualizePitch={true} showZoom={true}/>}
			{children}
		</Map>
	);
}