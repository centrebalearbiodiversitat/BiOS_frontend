"use client"

import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react';
import Map, {Layer, Source, NavigationControl, ScaleControl} from 'react-map-gl/maplibre';
import {Spinner} from "@heroui/spinner";
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
			tiles: ['/images/map/{z}/{x}/{y}.png'],
			tileSize: 256,
		},
		hillshadeSource: {
			type: 'raster-dem',
			tiles: ['/images/map/{z}/{x}/{y}.png'],
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
			paint: {'hillshade-shadow-color': 'hsl(146, 7%, 30%)'}
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


function PointsSource({data, taxaColors, idx, visible}) {
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
					layout={{visibility: visible ? "visible" : "none"}}
					paint={{
						'circle-radius': 13,
						'circle-pitch-scale': 'map',
						'circle-color': `rgba(0, 0, 0, 0)`,
					}}/>
				<Layer
					id={`${idx}-visible`}
					// type="heatmap"
					type="circle"
					layout={{visibility: visible ? "visible" : "none"}}
					paint={{
						'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 2, 16, 7],
						// "circle-stroke-width": 0.5,
                        // "circle-stroke-color": "#ffffff60",
						// 'circle-pitch-scale': 'map',
						'circle-color': `${color}`,
						// 'circle-stroke-color': `${color}88`,
						'circle-stroke-color': `#ffffff`,
						// 'circle-stroke-width': 8,
						'circle-stroke-width': ['interpolate', ['linear'], ['zoom'], 8, 0, 16, 2],
						// 'circle-stroke-opacity': 1,
						// 'circle-opacity': 0.3,
						// 'circle-color': `rgba(252, 186, 3)`,
						// 'circle-color': `#${Math.floor(Math.random()*16777215).toString(16)}`,
					}}
				/>
			</Source>
		);
	}
const polygonLayer = {
  type: 'line',
  paint: {
    // 'fill-color': '#39f31b',
    // 'fill-opacity': 0.4,
    "line-color": "#ffffff",
    "line-width": 3,
    // "line-opacity": .4,
  }
};


const MapLibre = forwardRef(({
	data, hidden = {}, taxaColors, children, loading = false, onClick = null,
	nav = true, navPos= "bottom-right", style = {}, sources
}, ref) => {
	const [lng] = useState(2.75802);
	const [lat] = useState(39.37029);
	const [zoom] = useState(7);
	const [bearing] = useState(-8);
	const [pitch] = useState(0);
	const mapRef = useRef(null);

	const exportMap = useCallback(async () => {
		const scaleDom = document.getElementsByClassName('maplibregl-ctrl-bottom-left');
		const mapDom = document.getElementsByClassName('maplibregl-canvas');
		const compassDom = document.getElementsByClassName('maplibregl-ctrl-compass');
		// const mapCanvas = mapRef.current?.getMap().getCanvas();
		if (mapDom) {
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

	function flyTo() {

		// const i = Math.floor(Math.random() * data[layer].features.length);
		mapRef.current?.flyTo({
			// center: data[layer].features[i].geometry.coordinates,
			pitch: mapRef.current.getPitch() === 0 ? 60 : 0,
			// bearing: Math.random() * 360,
			// duration: 2000,
			// essential: true
		})
	}

	return (
		<Map ref={mapRef} initialViewState={{longitude: lng, latitude: lat, zoom, bearing: bearing, pitch}}
		     mapStyle={MAP_STYLE} doubleClickZoom={false} preserveDrawingBuffer={true} maxZoom={14} minZoom={7}
		     interactiveLayerIds={data?.map((el, idx) => idx.toString())} style={{flex: 1, ...style}}
		     onDblClick={(e) => nav && flyTo()}
		     maxBounds={[
			     [-4.46368, 36.26470],
				 [9.49993, 42.27980],
		     ]}
		     onClick={e => onClick && e.features && onClick(e.features[0])}>
			{sources &&
				Object.values(sources).map(
					source => (
						<Source key={source.id} id={`geo-${source.id}`} type="geojson" data={JSON.parse(source.area)}>
							<Layer {...polygonLayer}/>
						</Source>
					)
				)
			}
			{data &&
				data.map((el, idx) => {
					return (
						<PointsSource visible={!(hidden[el.taxonId] ?? false)} key={idx} idx={idx} data={el} taxaColors={taxaColors}/>
					)
				})
			}
			<ScaleControl position="bottom-left" style={{zIndex: -10, position: "relative"}} maxWidth={200}/>
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