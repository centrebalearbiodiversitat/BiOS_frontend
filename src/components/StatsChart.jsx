import React, {useMemo} from "react";
import {
	BarChart,
	BarPlot,
	markElementClasses,
	LineChart,
	ResponsiveChartContainer,
	LinePlot,
	ChartsXAxis, ChartsYAxis, ChartsTooltip, LineHighlightPlot, ChartsAxisHighlight
} from "@mui/x-charts";


function parseData(data, show_null, yLabel) {
	const _x = [];
	const _y = [];
	let isLong = false;

	data?.forEach(e => {
		if (show_null || e[yLabel]) {
			const xLabel = e[yLabel].toString()
			isLong |= xLabel.length > 4
			_x.push(xLabel);
			_y.push(e.count);
		}
	});

	return {x: _x, y: _y, isLong};
}


export default function StatsChart({color = null, colorR = null, data, dataRight, yLabel, type, hideLegend= false, show_null = true}) {
	const {x, y, isLong} = useMemo(() => parseData(data, show_null, yLabel), [show_null, data, yLabel]);
	const {x: xR, y: yR, isLong: isLongR} = useMemo(() => parseData(dataRight, show_null, yLabel), [show_null, dataRight, yLabel]);

	if (type === "line") {
		return (
			<LineChart
				className="w-full h-full"
				series={[{data: y, label: yLabel, yAxisKey: "1", ...(color ? {color} : {})}].concat(dataRight ? [{data: yR, label: yLabel, yAxisKey: "2", ...(colorR ? {colorR} : {})}] : [])}
				sx={{
					[`& .${markElementClasses.root}`]: {
						scale: '0',
						fill: '#fff',
						strokeWidth: 2,
					},
				}}
				slotProps={{legend: { hidden: hideLegend }}}
				xAxis={[{scaleType: 'point', data: x}]}
				yAxis={[{ id: '1' }].concat(dataRight ? [{ id: '2' }] : [])}
				rightAxis={dataRight && "2"}
			/>
		);
	} else if (type === "bar") {
		return (
			<BarChart
				className="w-full h-full"
				series={[{data: y, label: yLabel, type: 'bar', ...(color ? {color} : {})}]}
				slotProps={{legend: { hidden: hideLegend }}}
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
	} else if (type === "combined") {
		return (
			<ResponsiveChartContainer
				series={[
					{data: y, type: "bar", label: yLabel, yAxisKey: "1", ...(color ? {color} : {})},
					{data: yR, type: "line", label: yLabel, yAxisKey: "2", ...(colorR ? {colorR} : {})}
				]}
				sx={{
					[`& .${markElementClasses.root}`]: {
						scale: '0',
						fill: '#fff',
						strokeWidth: 2,
					},
				}}
				slotProps={{legend: { hidden: hideLegend }}}
				xAxis={[{scaleType: 'band', data: x}]}
				yAxis={[{ id: '1' }, { id: '2' }]}
				rightAxis={"2"}
			>
				<BarPlot/>
				<LinePlot/>
				<ChartsXAxis/>
				<ChartsYAxis/>
				<ChartsTooltip/>
				<LineHighlightPlot/>
				<ChartsAxisHighlight x="line" />
			</ResponsiveChartContainer>
		);
	} else {
		throw new Error("Unknown char type");
	}
}