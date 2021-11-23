import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAuth, signOut } from 'firebase/auth';

import { Col, Container, Form, Image, Row, ListGroup } from 'react-bootstrap';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

// auth
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth, logOut } from '../features/auth/firebase';

const MainMenu = ({ toggle, onToggle }) => {
  const auth = getAuth();
  const history = useHistory();
  const user = useSelector(state => state.auth.userInfo);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!user) setIsLogin(false);
    else if (user) setIsLogin(true);
  }, [user]);

  const handleClick = () => {
    onToggle(!toggle);
    const ref = `?referer=${encodeURIComponent(window.location.pathname)}`;
    if (!user) return history.push(`/login${ref}`);
    if (user) {
      signOut(auth)
        .then(res => console.log('user sign out', res))
        .catch(error => console.log(error));
      window.location.reload();
    }
  };

  return (
    <div className={`mian-menu ${toggle ? 'show' : ''}`}>
      <div className="overlay" onClick={e => onToggle(!toggle)}></div>
      <ListGroup defaultActiveKey="#link1">
        {isLogin ? (
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <ListGroup.Item action>Profile</ListGroup.Item>
          </Link>
        ) : (
          ''
        )}
        <ListGroup.Item action onClick={() => handleClick()}>
          {isLogin ? 'Logout' : 'Login'}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

const TopNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const logo = require('../assets/images/logo.png').default;

  return (
    <div className="top-nav">
      <Container className="py-2 border">
        <Row>
          <Col xs={2} sm={2} md={2} lg={2} xl={2} className="align-self-center">
            <Link to="/">
              <Image src={logo} fluid />
            </Link>
          </Col>
          <Col>
            <Row>
              <Col className="align-self-center">
                <Form>
                  <Form.Group>
                    <Form.Control type="text" size="sm" placeholder="search" />
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={1} sm={1} md={1} lg={1} xl={1} className="align-self-center">
                <FontAwesomeIcon icon={faEllipsisV} onClick={() => setToggle(!toggle)} />
                <MainMenu toggle={toggle} onToggle={setToggle} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopNavbar;
