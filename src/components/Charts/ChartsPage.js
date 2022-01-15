import React, { useCallback, useEffect, useState } from 'react';
import { LineChart, XAxis, CartesianGrid, Line, YAxis, Tooltip } from 'recharts';
import { Row, Col, Button } from 'react-bootstrap';

import { SizeSettings } from './SizeSettings';
import { ChartInfo } from './ChartInfo';
import { ChartEditModal } from './ChartEditModal';
import { ChartDeleteModal } from './ChartDeleteModal';
import { useLanguage } from '../../hooks/useLanguage';

const func = (x, a, b, c) => {
  return a * x * Math.pow(Math.exp(1), (-b) * x) + c
};

export const ChartsPage = () => {
	const language = useLanguage();

	const [width, setWidth] = useState(850);
  const [height, setHeight] = useState(500);

  const [data, setData] = useState([]);
	const [chartsInfo, setChartsInfo] = useState([{
		name: 'График 1',
		a: 5,
		b: 1,
		c: 2,
		color: '#ff7300'
	}]);

	const [editIdx, setEditIdx] = useState(undefined);
	const [deleteIdx, setDeleteIdx] = useState(undefined);

	const getData = useCallback(() => {
		let data = [];
		for(let i = -1; i < 25; i++) {
			let dataItem = { x: i };
			chartsInfo.forEach((item, idx) => {
				dataItem[`${idx}y`] = func(i, item.a, item.b, item.c);
			});
			data.push(dataItem);
		}
		return data;
	}, [chartsInfo]);

  useEffect(() => {
    let data = getData();
    setData(data)
  }, [chartsInfo, getData]);



	const handleEditChart = useCallback((data) => {
		let idx = data.chart;
		let tmp = [...chartsInfo];
    tmp[idx].a = Number(data.a);
		tmp[idx].b = Number(data.b);
		tmp[idx].c = Number(data.c);
		tmp[idx].color = data.color;
		setChartsInfo(tmp);
		setEditIdx(undefined);
	}, [chartsInfo, setChartsInfo]);

	const handleDeleteChart = useCallback(() => {
		let tmp = [...chartsInfo];
		tmp.splice(deleteIdx, 1);
		setChartsInfo(tmp);
		setDeleteIdx(undefined);
	}, [deleteIdx, chartsInfo]);

	return (
		<>
			<Row className="mt-3">
				<Col xs={2} >
					<SizeSettings width={width} height={height} setWidth={setWidth} setHeight={setHeight} />
				</Col>
				<Col>
					<LineChart width={width} height={height} data={data}>
						<XAxis dataKey="x" />
						<YAxis />
						<Tooltip />
						<CartesianGrid stroke="#123411" />
						{chartsInfo.map((item, idx) => 
							<Line type="monotone" dataKey={`${idx}y`} stroke={item.color} />
						)}
					</LineChart>
				</Col>
			</Row>


			{chartsInfo.map((item, idx) =>
				<Row className="mt-4 p-2 bg-light shadow rounded" key={idx}>
					<Col xs={1} className="text-center">
						<Button size="sm" className="m-1" onClick={() => setEditIdx(idx)}>
							{language.currentDictionary.Charts.ChartsPage.EditButton}
						</Button>
					</Col>
					<Col xs={11}>
						<ChartInfo chartInfo={item} />
					</Col>
				</Row>
			)}

			{editIdx !== undefined && (
				<ChartEditModal
					show={true}
					chartsInfo={chartsInfo}
					index={editIdx}
					onSubmit={handleEditChart}
					handleClose={() => setEditIdx(undefined)}
				/>
			)}

			{deleteIdx !== undefined && (
				<ChartDeleteModal
					show={true} 
					handleClose={() => setDeleteIdx(undefined)} 
					handleSubmit={handleDeleteChart}
				/>
			)}
		</>
	);
}