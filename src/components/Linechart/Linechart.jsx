import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Linechart = props => {
	console.log(props.data);
	return (
		<ResponsiveContainer width='100%' aspect={1.5}>
			<LineChart
				width={500}
				height={300}
				data={props.data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<XAxis
					dataKey='atDateTime'
					domain={[
						props.data[0].atDateTime,
						props.data[props.data.length - 1].atDateTime,
					]}
				/>
				<YAxis dataKey='price' />
				<Tooltip />
				<Line
					type='monotone'
					dataKey='price'
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default Linechart;
