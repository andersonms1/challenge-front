// https://github.com/highcharts/highcharts-react/issues/140
import React, { FC } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { assets } from '../../constants';

HighchartsMore(Highcharts);

const filterOptions = () => {
	const _data = assets;

	const filter = _data.map((item) => {
		return {
			x: parseInt(item.metrics.totalCollectsUptime.toFixed()),
			y: item.healthscore ? parseInt(item.healthscore?.toFixed()) : 0,
			z: 0,
			name: `Id: ${item.id}`,
		};
	});
	return filter;
};

const options = {
	chart: {
		type: 'bubble',
		plotBorderWidth: 1,
		zoomType: 'xy',
	},

	legend: {
		enabled: false,
	},

	title: {
		text: 'HealthScore e Uptime per asset',
	},

	subtitle: {
		text: 'Source: <a href="https://github.com/tractian/fake-api">Fake-api</a>',
	},

	accessibility: {
		point: {
			valueDescriptionFormat:
				'{index}. {point.name}, uptime: {point.x}g, score: {point.y}g, satisfatorio: {point.z}%.',
		},
	},

	xAxis: {
		gridLineWidth: 1,
		title: {
			text: 'Tempo total da máquina',
		},
		labels: {
			format: '{value} Horas',
		},
		plotLines: [
			{
				color: 'black',
				dashStyle: 'dot',
				width: 2,
				value: 65,
				label: {
					rotation: 0,
					y: 15,
					style: {
						fontStyle: 'italic',
					},
					text: 'Linha ideal',
				},
				zIndex: 3,
			},
		],
		accessibility: {
			rangeDescription: 'Range: Acessibilidade X',
		},
	},

	yAxis: {
		startOnTick: false,
		endOnTick: false,
		title: {
			text: 'Confiabilidade da máquida',
		},
		labels: {
			format: '{value} %',
		},
		maxPadding: 0.2,
		plotLines: [
			{
				color: 'black',
				dashStyle: 'dot',
				width: 2,
				value: 70,
				label: {
					align: 'right',
					style: {
						fontStyle: 'italic',
					},
					text: 'Confiabilidade adequada',
					x: -10,
				},
				zIndex: 3,
			},
		],
		accessibility: {
			rangeDescription: 'Range: Acessibilidade y',
		},
	},

	tooltip: {
		useHTML: true,
		headerFormat: '<table>',
		pointFormat:
			'<tr><th colspan="2"><h3>{point.asset}</h3></th></tr>' +
			'<tr><th>Uptime:</th><td>{point.x}g</td></tr>' +
			'<tr><th>Health score:</th><td>{point.y}g</td></tr>',
		footerFormat: '</table>',
		followPointer: true,
	},

	plotOptions: {
		series: {
			dataLabels: {
				enabled: true,
				format: '{point.name}',
			},
		},
	},

	series: [
		{
			data: filterOptions(),
		},
	],
};

const Bubble: FC = () => {
	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default Bubble;
