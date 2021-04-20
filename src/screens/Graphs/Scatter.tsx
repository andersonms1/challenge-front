import React, { FC } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { assets } from '../../constants';

HighchartsMore(Highcharts);

const inAlert = assets.filter((item) => item.status === 'inAlert');
const inDowntime = assets.filter((item) => item.status === 'inDowntime');
const inOperation = assets.filter((item) => item.status === 'inOperation');

const options = {
	chart: {
		type: 'scatter',
		zoomType: 'xy',
	},
	title: {
		text: 'Health X Uptime de 10 máquinas variadas',
	},
	subtitle: {
		text: 'Dados imaginários',
	},
	xAxis: {
		title: {
			enabled: true,
			text: 'Total uptime (HR)',
		},
		startOnTick: true,
		endOnTick: true,
		showLastLabel: true,
	},
	yAxis: {
		title: {
			text: 'Confiabilidade %',
		},
	},
	legend: {
		layout: 'vertical',
		align: 'left',
		verticalAlign: 'top',
		x: 100,
		y: 70,
		floating: true,
		backgroundColor: 'white',
		borderWidth: 1,
	},
	plotOptions: {
		scatter: {
			marker: {
				radius: 5,
				states: {
					hover: {
						enabled: true,
						lineColor: 'rgb(100,100,100)',
					},
				},
			},
			states: {
				hover: {
					marker: {
						enabled: false,
					},
				},
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				pointFormat: '{point.x} cm, {point.y} kg',
			},
		},
	},
	series: [
		{
			name: 'inAlert',
			color: 'rgba(223, 83, 83, .5)',
			data: inAlert.map((item) => [
				item.metrics.totalCollectsUptime,
				item.healthscore,
			]),
		},
		{
			name: 'inDowntime',
			color: 'rgba(119, 152, 191, .5)',
			data: inDowntime.map((item) => [
				item.metrics.totalCollectsUptime,
				item.healthscore,
			]),
		},
		{
			name: 'inOperation',
			color: 'green',
			data: inOperation.map((item) => [
				item.metrics.totalCollectsUptime,
				item.healthscore,
			]),
		},
	],
};

const Scatter: FC = () => {
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default Scatter;
