import React, { useCallback } from "react";
import { Card, Form, Col, Row, Button, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import { useAuth } from "../../hooks/useAuth";
import { useLanguage } from '../../hooks/useLanguage';

const initialValues = {
	userName: '',
	password: ''
};

export const Login = () => {
	const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
	const language = useLanguage();

	const validationSchema = Yup.object().shape({
		userName: Yup.string().required(language.currentDictionary.Auth.Login.FormErrors.Username),
		password: Yup.string().required(language.currentDictionary.Auth.Login.FormErrors.Password)
	});

  const { from } = location.state || { from: { pathname: "/" } };
	const handleSubmit = useCallback((data, formikHelpers) => {
		formikHelpers.setStatus(undefined);
		try {
			auth.signin(data, language.currentDictionary.Auth.useProvideAuth.SigninError, () => {
				history.replace(from);
			});
		} catch(error) {
			formikHelpers.setStatus(error.message);
			formikHelpers.setSubmitting(false);
		}
	}, [auth, history, from, language]);

	return (
		<div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '-3rem' }}>
			<Card style={{ width: '480px' }} className="shadow">
				<Card.Header className="text-center">
					<h4>{language.currentDictionary.Auth.Login.Header}</h4>
				</Card.Header>
				<Card.Body>
					<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
						{(formik) => (
							<>
								{formik.status && (
									<Alert variant="danger">{formik.status}</Alert>
								)}
								<Form onSubmit={formik.handleSubmit}>
									<Form.Group as={Row} ControlId={'userName'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Login.Username}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="text"
												name="userName"
												onChange={(event) => formik.setFieldValue('userName', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['userName']}</span>
										</Col>
									</Form.Group>
									<Form.Group as={Row} ControlId={'password'} className="my-3">
										<Form.Label column sm={3} style={{textAlign: 'right'}}>{language.currentDictionary.Auth.Login.Password}:</Form.Label>
										<Col sm={9}>
											<Form.Control
												type="password"
												name="password"
												onChange={(event) => formik.setFieldValue('password', event.target.value)}
											/>
											<span className="text-danger">{formik.errors['password']}</span>
										</Col>
									</Form.Group>
									<div className="text-center">
										<Button type="submit" className="w-100 mb-2">{language.currentDictionary.Auth.Login.LoginButton}</Button>
										<Link to={(l) => ({ ...l, pathname: `/register` })}>{language.currentDictionary.Auth.Login.RegisterLink}</Link>
									</div>
								</Form>
							</>
						)}
					</Formik>
				</Card.Body>
			</Card>
		</div>
	);
}