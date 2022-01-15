import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useLanguage } from '../../hooks/useLanguage';

export const ChartEditModal = (props) => {
	const language = useLanguage();

	const [initialValues, setInitialValues] = useState(undefined);
	const [chartOptions, setChartOptions] = useState([]);

	const validationSchema = Yup.object().shape({
		chart: Yup.number().required(language.currentDictionary.Charts.ChartEditModal.FormErrors.Chart),
		a: Yup.number().required(language.currentDictionary.Charts.ChartEditModal.FormErrors.A),
		b: Yup.number().required(language.currentDictionary.Charts.ChartEditModal.FormErrors.B),
		c: Yup.number().required(language.currentDictionary.Charts.ChartEditModal.FormErrors.C),
		color: Yup.string().required(language.currentDictionary.Charts.ChartEditModal.FormErrors.Color)
	});

	const index = props.index;
	const chartsInfo = props.chartsInfo;
	const propsOnSubmit = props.onSubmit;

	const handleChartChange = useCallback((value) => {
		let chartInfo = chartsInfo[value];
		setInitialValues({
			chart: value,
			a: chartInfo.a,
			b: chartInfo.b,
			c: chartInfo.c,
			color: chartInfo.color
		});
	}, [chartsInfo, setInitialValues]);

	useEffect(() => {
		let chartOptions = [];
		chartsInfo.forEach((item, idx) => {
			chartOptions.push({ label: item.name, value: idx });
		});
		setChartOptions(chartOptions);

		handleChartChange(index);
	}, [chartsInfo, index, setChartOptions, handleChartChange]);

	const handleSubmit = useCallback((data, formikHelpers) => {
		formikHelpers.setStatus(undefined);
		propsOnSubmit(data);
	}, [propsOnSubmit]);

	if(!initialValues) {
		return (
			<Modal show={props.show} onHide={props.handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>{language.currentDictionary.Charts.ChartEditModal.Header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{language.currentDictionary.Charts.ChartEditModal.Loading}</Modal.Body>
			</Modal>
		);
	}

	return (
		<Modal show={props.show} onHide={props.handleClose} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>{language.currentDictionary.Charts.ChartEditModal.Header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
					{(formik) => (
						<Form onSubmit={formik.handleSubmit}>
							<Form.Group as={Row} ControlId={'chart'} className="my-2">
								<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Charts.ChartEditModal.ChartLabel}:</Form.Label>
								<Col sm={9}>
									<Form.Select
										name="chart"
										value={formik.values['chart']}
										onChange={(event) => {
											formik.setFieldValue('chart', event.target.value);
											handleChartChange(event.target.value);
										}}
										className="cursor-pointer">
										{chartOptions.map((item) =>
											<option value={item.value} className="cursor-pointer">{item.label}</option>
										)}
									</Form.Select>
								</Col>
							</Form.Group>

							<Form.Group as={Row} ControlId={'a'} className="my-2">
								<Form.Label column sm={3} style={{textAlign: 'right'}}>A:</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="number"
										name="a"
										value={formik.values['a']}
										onChange={(event) => formik.setFieldValue('a', event.target.value)}
									/>
									<span className="text-danger">{formik.errors['a']}</span>
								</Col>
							</Form.Group>

							<Form.Group as={Row} ControlId={'b'} className="my-2">
								<Form.Label column sm={3} style={{textAlign: 'right'}}>B:</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="number"
										name="b"
										value={formik.values['b']}
										onChange={(event) => formik.setFieldValue('b', event.target.value)}
									/>
									<span className="text-danger">{formik.errors['b']}</span>
								</Col>
							</Form.Group>

							<Form.Group as={Row} ControlId={'c'} className="my-2">
								<Form.Label column sm={3} style={{textAlign: 'right'}}>C:</Form.Label>
								<Col sm={9}>
									<Form.Control
										type="number"
										name="c"
										value={formik.values['c']}
										onChange={(event) => formik.setFieldValue('c', event.target.value)}
									/>
									<span className="text-danger">{formik.errors['c']}</span>
								</Col>
							</Form.Group>

							<Form.Group as={Row} ControlId={'color'} className="my-2">
								<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Charts.ChartEditModal.ColorLabel}:</Form.Label>
								<Col sm={9}>
									<Form.Control
										name="color"
										type="color"
										id="exampleColorInput"
										value={formik.values['color']}
										title="Choose your color"
										onChange={(event) => formik.setFieldValue('color', event.target.value)}
									/>
								</Col>
							</Form.Group>							
							
							<div className="d-flex flex-row-reverse">
								<Button variant="secondary" onClick={props.handleClose} className="mx-1">{language.currentDictionary.Charts.ChartEditModal.CancelButton}</Button>
								<Button variant="primary" type="submit" className="mx-1">{language.currentDictionary.Charts.ChartEditModal.SaveButton}</Button>						
							</div>
						</Form>
					)}
        </Formik>
			</Modal.Body>
		</Modal>
	);
};