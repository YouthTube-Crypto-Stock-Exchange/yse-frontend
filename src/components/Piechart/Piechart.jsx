import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import * as d3 from 'd3';

const Piechart = props => {
	const { data } = props;
	const colorScale = d3
		.scaleSequential()
		.interpolator(d3.interpolateRainbow)
		.domain([0, data.length]);
	return (
		<>
			<PieChart width={400} height={400}>
				<Pie
					dataKey='total'
					data={data}
					cx={200}
					cy={200}
					outerRadius={150}
					fill='#8884d8'
					label>
					{data.map((entry, index) => (
						<Cell key={entry.label} fill={colorScale(index)} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</>
	);
};

export default Piechart;
