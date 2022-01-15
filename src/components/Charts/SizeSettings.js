import React from "react";
import Slider from 'react-input-slider';

import { useLanguage } from '../../hooks/useLanguage';

export const SizeSettings = (props) => {
	const language = useLanguage();

	return (
		<div className="p-3 bg-light shadow rounded">
			<div>
				<strong>{language.currentDictionary.Charts.SizeSettings.Width} [{props.width}]: </strong>
				<Slider
					axis="x"
					xstep={50}
					xmin={100}
					xmax={1000}
					x={props.width}
					className="w-100"
					onChange={({ x }) => props.setWidth(x)}
				/>
			</div>
			<div className="mt-1">
				<strong>{language.currentDictionary.Charts.SizeSettings.Height} [{props.height}]: </strong>
				<Slider
					axis="x"
					xstep={50}
					xmin={100}
					xmax={500}
					x={props.height}
					className="w-100"
					onChange={({ x }) => props.setHeight(x)}
				/>
			</div>
		</div>
	);
};