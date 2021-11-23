import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { Container, Image, FormControl, InputGroup, Accordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faArrowLeft,
  faCartPlus,
  faHeart,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';

import { CartList } from '../cart';

const ItemDetail = props => {
  const history = useHistory();
  const [qty, setQty] = useState(1);
  const [toggle, setToggle] = useState(false);

  const adjustQty = ({ type, value }) => {
    if (type === 'typing' && value && value !== '') {
      setQty(value);
    } else if (type === 'min' && qty > 1) {
      setQty(qty - 1);
    } else if (type === 'plus') {
      setQty(qty + 1);
    }
  };

  const onActiveBox = props => {
    console.log(props);
  };

  return (
    <div className="item-detail-main">
      <Container className="item-container">
        <div className="navigator" onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={'lg'} />
        </div>
        <div className="item-image">
          <Image src={require('../../assets/images/logo.png').default} fluid />
        </div>
        <div className="item-title">Item Name</div>
        <div className="item-caption">
          <div>category - child category</div>
          <div className="caption-stars">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
        </div>

        <div className="item-variant">
          <div className="variant-box" value={10} onClick={props => onActiveBox(props)}>
            <div className="title">title</div>
            <div className="caption">10</div>
          </div>
          <div className="variant-box" value={15} onClick={props => onActiveBox(props)}>
            <div className="title">title</div>
            <div className="caption">15</div>
          </div>
          <div className="variant-box" value={20} onClick={props => onActiveBox(props)}>
            <div className="title">title</div>
            <div className="caption">20</div>
          </div>
        </div>
      </Container>

      <div className="item-bottom-nav">
        <div className="nav-btn buy-now">Buy Now</div>
        <div className="nav-btn cart" onClick={() => setToggle(!toggle)}>
          Add to cart
        </div>
      </div>

      <div className={`bottom-fix-card ${toggle ? 'toggle' : ''}`}>
        <div className="fix-card-title">
          <div>Quantity (100g)</div>
          <div onClick={() => setToggle(!toggle)}>x</div>
        </div>

        <div className="qty-fixed">
          <div className="qty-card">
            <InputGroup>
              <InputGroup.Text onClick={() => adjustQty({ type: 'min' })}>
                <FontAwesomeIcon icon={faAngleLeft} size="sm" />
              </InputGroup.Text>
              <FormControl
                type="number"
                value={qty}
                onChange={e => adjustQty({ type: 'typing', value: e.target.value })}
                className="text-center"
                disabled
              />
              <InputGroup.Text onClick={() => adjustQty({ type: 'plus' })}>
                <FontAwesomeIcon icon={faAngleRight} size="sm" />
              </InputGroup.Text>
            </InputGroup>
          </div>
          <div className="price">Rp 35.000</div>
        </div>

        <div className="action-card">
          <div className="add-btn">Add to cart</div>
          <FontAwesomeIcon icon={faHeart} size="lg" />
        </div>

        <Cart />
      </div>
    </div>
  );
};

const CustomToggle = ({ eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    // console.log('totally custom!');
  });

  return (
    <div className="cart-fixed" onClick={decoratedOnClick}>
      <div className="d-flex">
        <div style={{ paddingRight: '1rem' }}>
          <FontAwesomeIcon icon={faCartPlus} />
        </div>
        <div>Cart</div>
      </div>
      <div>0</div>
    </div>
  );
};

const Cart = () => {
  return (
    <Accordion>
      <CustomToggle eventKey="0" />
      <Accordion.Collapse eventKey="0">
        <CartList className="black" />
      </Accordion.Collapse>
    </Accordion>
  );
};

export default ItemDetail;
