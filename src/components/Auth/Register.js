import React, { useCallback } from "react";
import { Card, Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from '../../hooks/useLanguage';

const initialValues = {
	name: '',
	userName: '',
	password: '',
	confirmPassword: '',
	age: 'example@test.com',
	country: ''
};

export const Register = () => {
	const history = useHistory();
  const auth = useAuth();
	const language = useLanguage();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required(language.currentDictionary.Auth.Register.FormErrors.Name),
		userName: Yup.string().required(language.currentDictionary.Auth.Register.FormErrors.Username),
		password: Yup.string().required(language.currentDictionary.Auth.Register.FormErrors.Password),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], language.currentDictionary.Auth.Register.FormErrors.PasswordsDontMatch)
			.required(language.currentDictionary.Auth.Register.FormErrors.ConfirmPassword),
		age: Yup.string(),
		country: Yup.string()
	});

	const handleSubmit = useCallback((data, formikHelpers) => {
		formikHelpers.setStatus(undefined);
		try {
			auth.register(data, () => {
				history.replace('/');
			});
		} catch(error) {
			formikHelpers.setStatus(error.message);
			formikHelpers.setSubmitting(false);
		}
	}, [auth, history]);

	return (
		<div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '-3rem' }}>
			<Card style={{ width: '640px' }} className="shadow">
				<Card.Header className="text-center">
					<h4>{language.currentDictionary.Auth.Register.Header}</h4>
				</Card.Header>
				<Card.Body>
					<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
						{(formik) => (
							<>
								{formik.status && (
									<Alert variant="danger">{formik.status}</Alert>
								)}
								<Form onSubmit={formik.handleSubmit}>
									<Form.Group as={Row} ControlId={'name'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Register.Name}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="text"
												name="name"
												value={formik.values['name']}
												onChange={(event) => formik.setFieldValue('name', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['name']}</span>
										</Col>
									</Form.Group>
									<Form.Group as={Row} ControlId={'userName'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Register.Username}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="text"
												name="userName"
												value={formik.values['userName']}
												onChange={(event) => formik.setFieldValue('userName', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['userName']}</span>
										</Col>
									</Form.Group>
									<Form.Group as={Row} ControlId={'password'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Register.Password}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="password"
												name="password"
												value={formik.values['password']}
												onChange={(event) => formik.setFieldValue('password', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['password']}</span>
										</Col>
									</Form.Group>
									<Form.Group as={Row} ControlId={'confirmPassword'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Register.ConfirmPassword}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="password"
												name="confirmPassword"
												value={formik.values['confirmPassword']}
												onChange={(event) => formik.setFieldValue('confirmPassword', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['confirmPassword']}</span>
										</Col>
									</Form.Group>
									<Form.Group as={Row} ControlId={'age'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Register.Age}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="text"
												name="age"
												value={formik.values['age']}
												onChange={(event) => formik.setFieldValue('age', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['age']}</span>
										</Col>
									</Form.Group>
									<Form.Group as={Row} ControlId={'country'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Register.Country}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="text"
												name="country"
												value={formik.values['country']}
												onChange={(event) => formik.setFieldValue('country', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['country']}</span>
										</Col>
									</Form.Group>
									<Button type="submit" className="w-100">{language.currentDictionary.Auth.Register.RegisterButton}</Button>
								</Form>
							</>
						)}
					</Formik>
				</Card.Body>
			</Card>
		</div>
	);
}