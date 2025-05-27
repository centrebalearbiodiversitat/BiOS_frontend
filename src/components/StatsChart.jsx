"use client"

import React, {useMemo} from "react";
import {
	BarPlot,
	markElementClasses,
	ChartContainer,
	LinePlot,
	ChartsXAxis, ChartsYAxis, ChartsTooltip, LineHighlightPlot, ChartsAxisHighlight, ChartsLegend
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


export default function StatsChart({color = null, colorR = null, data, dataRight, yLabel, type, show_null = true}) {
	const {x, y, isLong} = useMemo(() => parseData(data, show_null, yLabel), [show_null, data, yLabel]);
	const {x: xR, y: yR, isLong: isLongR} = useMemo(() => parseData(dataRight, show_null, yLabel), [show_null, dataRight, yLabel]);

	if (type === "line") {
		return (
			<ChartContainer
				className="w-full h-full"
				series={[
					{data: y, label: yLabel, yAxisKey: '1', type: 'line', color},
					...(dataRight ? [{data: yR, label: yLabel, yAxisKey: '2', type: 'line', ...(colorR ? {color: colorR} : {})}] : [])
				]}
				xAxis={[{scaleType: 'point', data: x}]}
				yAxis={[
					{id: '1'},
					...(dataRight ? [{id: '2', position: 'right'}] : [])
				]}
				sx={{
					[`& .${markElementClasses.root}`]: {
						scale: '0',
						fill: '#fff',
						strokeWidth: 2,
					},
				}}
			>
				<LinePlot/>
				<ChartsXAxis/>
				<ChartsYAxis/>
                <ChartsTooltip/>
			</ChartContainer>
		);
	} else if (type === "bar") {
		return (
			<ChartContainer
				className="w-full h-full min-h-full flex-grow"
				series={[{type: 'bar', data: y, label: yLabel, color}]}
				xAxis={[{
					scaleType: 'band',
					data: x,
					tickLabelStyle: isLong && {
						angle: 33,
						textAnchor: 'start'
					}
				}]}
			>
				<BarPlot/>
				<ChartsXAxis/>
				<ChartsYAxis/>
                <ChartsTooltip/>
			</ChartContainer>
		);
	} else if (type === "combined") {
		return (
            <ChartContainer
				series={[
					{data: y, type: "bar", label: yLabel, yAxisId: "bar", color},
					{data: yR, type: "line", label: yLabel, yAxisId: "line", ...(colorR ? {color: colorR} : {})}
				]}
				sx={{
					[`& .${markElementClasses.root}`]: {
						scale: '0',
						fill: '#fff',
						strokeWidth: 2,
					},
				}}
				xAxis={[{scaleType: 'band', data: x}]}
				yAxis={[{ id: 'bar', position: "left" }, { id: 'line', position: "right"}]}
			>
                <BarPlot/>
                <LinePlot/>
                <ChartsXAxis/>
	            <ChartsYAxis axisId="bar"/>
	            <ChartsYAxis axisId="line"/>
                <ChartsTooltip/>
                <LineHighlightPlot/>
                <ChartsAxisHighlight x="line"/>
            </ChartContainer>
        );
	} else {
		throw new Error("Unknown char type");
	}
}