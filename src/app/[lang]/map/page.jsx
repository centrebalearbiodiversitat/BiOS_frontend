"use client"
import Map from 'react-map-gl/maplibre';

export default function MapPage({}) {
	return (
		<div className="min-w-full h-full">
			<Map
				initialViewState={{
					longitude: -122.4,
					latitude: 37.8,
					zoom: 14
				}}
				style={{width: 600, height: 400}}
				mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
			/>
		</div>

	);
}
