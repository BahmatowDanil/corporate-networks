import React, { useCallback } from "react";
import { Card, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { PrivateRoute } from "../PrivateRoute";
import { ProfileEditLoginInfoModal } from "./ProfileEditLoginInfoModal";
import { useLanguage } from '../../hooks/useLanguage';

export const ProfilePage = () => {
  const auth = useAuth();
  const history = useHistory();
  const language = useLanguage();

  const handleChangeLoginInfo = useCallback((id, data) => {
    auth.changeLoginInfo(id, data, language.currentDictionary.Auth.useProvideAuth.UserNotFoundError, () => {
      history.goBack();
    });
  }, [auth, history, language]);

  return (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '-3rem' }}>
        <Card style={{ width: '480px' }} className="shadow">
          <Card.Header className="text-center">
            <h4>{language.currentDictionary.Profile.ProfilePage.Header}</h4>
          </Card.Header>
          <Card.Body>
            <Row className="mb-2">
              <Col sm={3} className="text-end fw-bold">{language.currentDictionary.Profile.ProfilePage.Name}:</Col>
              <Col sm={9}>{auth.currentUser.name}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={3} className="text-end fw-bold">{language.currentDictionary.Profile.ProfilePage.Username}:</Col>
              <Col sm={9}>{auth.currentUser.userName}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={3} className="text-end fw-bold">{language.currentDictionary.Profile.ProfilePage.Age}:</Col>
              <Col sm={9}>{auth.currentUser.age}</Col>
            </Row>
            <Row>
              <Col sm={3} className="text-end fw-bold">{language.currentDictionary.Profile.ProfilePage.Country}:</Col>
              <Col sm={9}>{auth.currentUser.country}</Col>
            </Row>
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => history.push('/profile/editLoginInfo')} className="w-100">
              {language.currentDictionary.Profile.ProfilePage.ChangeLoginInfoButton}
            </Button>
          </Card.Footer>
        </Card>
      </div>

      <PrivateRoute path="/profile/editLoginInfo" exact>
        <ProfileEditLoginInfoModal
          show={true}
          user={auth.currentUser}
          onSubmit={handleChangeLoginInfo}
          onClose={() => history.goBack()}
        />
      </PrivateRoute>
    </>
  );
}