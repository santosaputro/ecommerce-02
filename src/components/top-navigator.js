import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const TopNavigator = ({ arrow, title, rightElement }) => {
  const history = useHistory();

  return (
    <>
      <Container>
        <div className={`navigator ${arrow ? arrow : ''}`}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faArrowLeft} size={'lg'} onClick={() => history.goBack()} />
            <div style={{ marginLeft: '1rem', fontSize: '20px' }}>{title ? title : ''}</div>
          </div>
          {rightElement ? rightElement : ''}
        </div>
      </Container>
    </>
  );
};

export default TopNavigator;
