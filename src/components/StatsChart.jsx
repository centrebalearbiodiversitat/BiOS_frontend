import React, {useMemo} from "react";
import {BarChart, BarPlot, markElementClasses, LineChart} from "@mui/x-charts";


export default function StatsChart({color = null, data, yLabel, type, show_null = true}) {
	const {x, y, isLong} = useMemo(() => {
		const _x = [];
		const _y = [];
		let isLong = false;
		data?.forEach(e => {
			if (show_null || e[yLabel]) {
				const xLabel = e[yLabel].toString()
				isLong = xLabel.length > 4
				_x.push(xLabel);
				_y.push(e.count);
			}
		});

		return {x: _x, y: _y, isLong};
	}, [data, yLabel]);

	if (type === "line") {
		return (
			<LineChart
				className="w-full h-full"
				series={[{data: y, label: yLabel, ...(color ? {color} : {})}]}
				sx={{
					[`& .${markElementClasses.root}`]: {
						scale: '0',
						fill: '#fff',
						strokeWidth: 2,
					},
				}}
				slotProps={{legend: { hidden: true }}}
				xAxis={[{scaleType: 'point', data: x}]}
			/>
		);
	} else if (type === "bar") {
		return (
			<BarChart
				className="w-full h-full"
				series={[{data: y, label: yLabel, type: 'bar', ...(color ? {color} : {})}]}
				xAxis={[{
					scaleType: 'band',
					data: x,
					tickLabelStyle: isLong && {
						angle:33,
						textAnchor: 'start'
					}
				}]}
			>
				<BarPlot/>
			</BarChart>
		);
	} else {
		throw new Error("Unknown char type");
	}
}