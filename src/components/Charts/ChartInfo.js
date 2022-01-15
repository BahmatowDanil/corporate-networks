import React from "react";
import { Row, Col } from 'react-bootstrap';
import reactCSS from 'reactcss';

import { useLanguage } from '../../hooks/useLanguage';

export const ChartInfo = (props) => {
	const language = useLanguage();

	const styles = reactCSS({
		'default': {
			color: {
				width: '36px',
				height: '14px',
				borderRadius: '2px',
				background: props.chartInfo.color,
			},
			swatch: {
				padding: '5px',
				background: '#fff',
				borderRadius: '1px',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
			}
		}
	});

	return (
		<Row>
			<Col>
				<strong>{language.currentDictionary.Charts.ChartInfo.Name}</strong>
				<br />
				<span>{props.chartInfo.name}</span>
			</Col>
			<Col>
				<strong>A</strong>
				<br />
				<span>{props.chartInfo.a}</span>
			</Col>
			<Col>
				<strong>B</strong>
				<br />
				<span>{props.chartInfo.b}</span>
			</Col>
			<Col>
				<strong>C</strong>
				<br />
				<span>{props.chartInfo.c}</span>
			</Col>
			<Col>
				<strong>{language.currentDictionary.Charts.ChartInfo.Color}</strong>
				<br />
				<div style={ styles.swatch }>
					<div style={ styles.color } />
				</div>
			</Col>
		</Row>
	);
};