import { Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import * as Yup from 'yup';

import { useLanguage } from '../../hooks/useLanguage';

export const ProfileEditLoginInfoModal = (props) => {
  const [initialValues, setInitialValues] = useState(undefined);
  const language = useLanguage();

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required(language.currentDictionary.Profile.ProfileEditLoginInfoModal.FormErrors.Username),
    password: Yup.string().required(language.currentDictionary.Profile.ProfileEditLoginInfoModal.FormErrors.Password),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], language.currentDictionary.Profile.ProfileEditLoginInfoModal.FormErrors.ConfirmPassword)
      .required(language.currentDictionary.Profile.ProfileEditLoginInfoModal.FormErrors.PasswordsDontMatch)
  });

  useEffect(() => {
    setInitialValues({
      userName: props.user.userName,
      password: '',
      confirmPassword: ''
    })
  }, [props.user]);

  const propsOnSubmit = props.onSubmit;
  const handleSubmit = useCallback((data, formikHelpers) => {
    formikHelpers.setStatus(undefined);
    try {
      propsOnSubmit(props.user.id, data);
    } catch(error) {
      formikHelpers.setStatus(error.message);
      formikHelpers.setSubmitting(false);
    }
  }, [propsOnSubmit, props.user]);

  if(!initialValues) {
    return (
      <Modal show={props.show} onHide={props.onClose}>
				<Modal.Header closeButton>
					<Modal.Title>{language.currentDictionary.Profile.ProfileEditLoginInfoModal.Header}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{language.currentDictionary.Profile.ProfileEditLoginInfoModal.Loading}</Modal.Body>
			</Modal>
    );
  }

  return (
    <Modal show={props.show} onHide={props.onClose} size="lg">
      <Modal.Header closeButton>
				<Modal.Title>{language.currentDictionary.Profile.ProfileEditLoginInfoModal.Header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
					{(formik) => (
            <>
              {formik.status && (
                <Alert variant="danger">{formik.status}</Alert>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group as={Row} ControlId={'userName'} className="my-2">
                  <Form.Label column sm={3} style={{textAlign: 'right'}}>
                    {language.currentDictionary.Profile.ProfileEditLoginInfoModal.Username}:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      name="userName"
                      value={formik.values['userName']}
                      onChange={(event) => formik.setFieldValue('userName', Number(event.target.value))}
                    />
                    <span className="text-danger">{formik.errors['userName']}</span>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} ControlId={'password'} className="my-2">
                  <Form.Label column sm={3} style={{textAlign: 'right'}}>
                    {language.currentDictionary.Profile.ProfileEditLoginInfoModal.Password}:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formik.values['password']}
                      onChange={(event) => formik.setFieldValue('password', Number(event.target.value))}
                    />
                    <span className="text-danger">{formik.errors['password']}</span>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} ControlId={'confirmPassword'} className="my-2">
                  <Form.Label column sm={3} style={{textAlign: 'right'}}>
                    {language.currentDictionary.Profile.ProfileEditLoginInfoModal.ConfirmPassword}:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formik.values['confirmPassword']}
                      onChange={(event) => formik.setFieldValue('confirmPassword', Number(event.target.value))}
                    />
                    <span className="text-danger">{formik.errors['confirmPassword']}</span>
                  </Col>
                </Form.Group>	
                <div className="d-flex flex-row-reverse">
                  <Button variant="secondary" onClick={props.onClose} className="mx-1">
                    {language.currentDictionary.Profile.ProfileEditLoginInfoModal.CancelButton}
                  </Button>
                  <Button variant="primary" type="submit" className="mx-1">
                    {language.currentDictionary.Profile.ProfileEditLoginInfoModal.SaveButton}
                  </Button>						
                </div>
              </Form>
            </>
					)}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};