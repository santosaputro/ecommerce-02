import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Content = props => {
  return (
    <Container>
      <Category height={props.height} />
      <div className="item-column">
        {Array(14)
          .fill('')
          .map((_, i) => (
            <CardItems key={i} />
          ))}
      </div>
    </Container>
  );
};

const Category = ({ height }) => {
  return (
    <div className="sticky-card-container" style={{ top: height }}>
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
      <div className="btn btn-success px-4">Success</div>{' '}
    </div>
  );
};

const CardItems = () => {
  const makeid = () => {
    const length = Math.floor(Math.random() * 100);
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charLength = chars.length;
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charLength)) + ' ';
    }

    return result;
  };
  const image = require('../assets/images/logo.png').default;

  return (
    // <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-0">
    <Link to="/item">
      <div className="item-card">
        <div className="item-image">
          <Image src={image} fluid />
        </div>
        <div className="item-content">
          <div className="content-title">{makeid()}</div>
          <div className="content-price">Rp 15.000</div>
        </div>
      </div>
    </Link>
    // </Col>
  );
};

export default Content;
