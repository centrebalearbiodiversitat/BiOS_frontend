import React, {useMemo} from "react";
import {t} from "@/i18n/i18n";
import {BarChart, BarPlot, markElementClasses, LineChart} from "@mui/x-charts";


export default function StatsChart({lang, data, yLabel, type, show_null = true}) {
	const {x, y} = useMemo(() => {
		const _x = [];
		const _y = [];

		data?.forEach(e => {
			if (show_null || e[yLabel] !== null) {
				_x.push(e[yLabel]);
				_y.push(e.count);
			}
		});

		return {x: _x, y: _y};
	}, [data, yLabel]);

	if (type === "line") {
		return (
			<LineChart
				className="w-full h-full"
				series={[
					{data: y, label: yLabel},
				]}
				sx={{
			        [`& .${markElementClasses.root}`]: {
			          scale: '0',
			          fill: '#fff',
			          strokeWidth: 2,
			        },
			    }}
				xAxis={[{scaleType: 'point', data: x}]}
			/>
		);
	} else if (type === "bar") {
		return (
			<BarChart
				className="w-full h-full"
				series={[
					{data: y, label: yLabel, type: 'bar'}
				]}
				xAxis={[{scaleType: 'band', data: x}]}
			>
				<BarPlot/>
			</BarChart>
		);
	} else {
		throw new Error("Unknown char type");
	}
}