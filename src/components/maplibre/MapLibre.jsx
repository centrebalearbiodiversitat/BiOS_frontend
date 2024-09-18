"use client"

import React, {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';
import Map, {Layer, Source, NavigationControl, ScaleControl} from 'react-map-gl/maplibre';
import {Spinner} from "@nextui-org/react";
import html2canvas from "html2canvas";

const MAP_STYLE = {
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
            paint: { 'background-color': '#A0D3D3' }
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


function PointsSource({data, taxaColors, idx}) {
		if (!data) {
			return undefined;
		}

		const color = taxaColors[data.taxonId]

		return (
			<Source id={`source-points-${idx}`} type="geojson" data={data} cluster={false}>
				<Layer
					id={`${idx}`}
					// type="heatmap"
					type="circle"
					paint={{
						'circle-radius': 13,
						'circle-pitch-scale': 'map',
						'circle-color': `rgba(0, 0, 0, 0)`,
						// 'circle-opacity': 0.3,
						// 'circle-color': `rgba(252, 186, 3)`,
						// 'circle-color': `#${Math.floor(Math.random()*16777215).toString(16)}`,
					}}/>
				<Layer
					id={`${idx}-visual`}
					// type="heatmap"
					type="circle"
					paint={{
						'circle-radius': 3,
						'circle-pitch-scale': 'map',
						'circle-color': `${color}`,
						// 'circle-opacity': .65,
						// 'circle-stroke-color': `${color}`,
						// 'circle-stroke-width': 1,
						// 'circle-stroke-opacity': 1,
						// 'circle-opacity': 0.3,
						// 'circle-color': `rgba(252, 186, 3)`,
						// 'circle-color': `#${Math.floor(Math.random()*16777215).toString(16)}`,
					}}
					// paint={{
	                //     // Increase the heatmap weight based on frequency and property magnitude
	                //     'heatmap-weight': [
	                //         'interpolate',
	                //         ['linear'],
	                //         ['get', 'mag'],
	                //         0,
	                //         0,
	                //         6,
	                //         1
	                //     ],
	                //     // Increase the heatmap color weight weight by zoom level
	                //     // heatmap-intensity is a multiplier on top of heatmap-weight
	                //     // 'heatmap-intensity': [
	                //     //     'interpolate',
	                //     //     ['linear'],
	                //     //     ['zoom'],
	                //     //     0,
	                //     //     1,
	                //     //     9,
	                //     //     3
	                //     // ],
	                //     // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
	                //     // Begin color ramp at 0-stop with a 0-transparancy color
	                //     // to create a blur-like effect.
	                //     'heatmap-color': [
	                //         'interpolate',
	                //         ['linear'],
	                //         ['heatmap-density'],
	                //         0,
	                //         `${color}00`,
	                //         0.2,
	                //         `${color}20`,
	                //         0.4,
	                //         `${color}40`,
	                //         0.6,
	                //         `${color}60`,
	                //         0.8,
	                //         `${color}80`,
	                //         1,
	                //         `${color}FF`,
	                //     ],
	                //     // Adjust the heatmap radius by zoom level
	                //     'heatmap-radius': [
	                //         'interpolate',
	                //         ['linear'],
	                //         ['zoom'],
	                //         0,
	                //         2,
	                //         9,
	                //         20
	                //     ],
					// 	'heatmap-opacity': 0.7
	                //     // Transition from heatmap to circle layer by zoom level
	                //     // 'heatmap-opacity': [
	                //     //     'interpolate',
	                //     //     ['linear'],
	                //     //     ['zoom'],
	                //     //     7,
	                //     //     1,
	                //     //     9,
	                //     //     0
	                //     // ]
	                // }
				/>
			</Source>
		);
	}


const MapLibre = forwardRef(({
	data, taxaColors, children, loading = false, onClick = null,
	nav = true, navPos= "bottom-right", style = {}
}, ref) => {
	const [lng] = useState(2.75802);
	const [lat] = useState(39.37029);
	const [zoom] = useState(7);
	const [bearing] = useState(-8);
	const [pitch] = useState(0);
	const mapRef = useRef();

	const exportMap = useCallback(async () => {
		const scaleDom = document.getElementsByClassName('maplibregl-ctrl-bottom-left');
		const mapDom = document.getElementsByClassName('maplibregl-canvas');
		const compassDom = document.getElementsByClassName('maplibregl-ctrl-compass');
		// const mapCanvas = mapRef.current?.getMap().getCanvas();
		if (mapDom) {
			console.log(mapDom)
			const scaleCanvas = await html2canvas(scaleDom[0]);
			const compassCanvas = await html2canvas(compassDom[0]);
			const mapCanvas = await html2canvas(mapDom[0]);
			mapCanvas.getContext('2d').drawImage(scaleCanvas, 0, 0);
			mapCanvas.getContext('2d').drawImage(compassCanvas, 0, 200);
			const image = mapCanvas.toDataURL('image/png');
			const link = document.createElement('a');
			link.href = image;
			link.download = 'map-export.png';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}, []);

	useImperativeHandle(ref, () => {
		return {
			exportMap
		}
	});

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

	return (
		<Map ref={mapRef} initialViewState={{longitude: lng, latitude: lat, zoom, bearing: bearing, pitch}}
		     mapStyle={MAP_STYLE} doubleClickZoom={false} preserveDrawingBuffer={true}
		     interactiveLayerIds={data.map((el, idx) => idx.toString())} style={{flex: 1, ...style}}
		     onDblClick={(e) => nav && flyTo(0)}
		     onClick={e => onClick && e.features && onClick(e.features[0])}>
			{data &&
				data.map((el, idx) => {
					return (
						<PointsSource key={idx} idx={idx} data={el} taxaColors={taxaColors}/>
					)
				})
			}
			<div className="bg-transparent">
				<ScaleControl maxWidth={200}/>
			</div>
			{nav &&
				<NavigationControl showCompass={true} position={navPos} visualizePitch={true} showZoom={true}/>}
			{children}
			{loading && <div className="bg-white/50 w-full h-full flex justify-center items-center" style={{position: 'absolute', top: 0, left: 0}}>
				<Spinner size={"lg"}/>
			</div>}
		</Map>
	);
});

MapLibre.displayName = "MapLibre";

export default MapLibre;