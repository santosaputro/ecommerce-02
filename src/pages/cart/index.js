import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Card, Container, Form, Image } from 'react-bootstrap';
import { useHistory } from 'react-router';

const Cart = () => {
  const history = useHistory();

  return (
    <div>
      <Container>
        <div className="navigator black">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faArrowLeft} size={'lg'} onClick={() => history.goBack()} />
            <div style={{ marginLeft: '1rem', fontSize: '20px' }}>Cart</div>
          </div>
          <div className="btn btn-sm btn-primary px-3">Edit</div>
        </div>
      </Container>
      <CartList checklist action />
      <CheckoutBottomCard />
    </div>
  );
};

const CartList = props => {
  return Array(7)
    .fill()
    .map((_, i) => {
      const classElement = props && props.className ? 'cart-list ' + props.className : 'cart-list';

      const checklist =
        props && props.checklist ? (
          <Form.Check
            type="checkbox"
            id="default-checkbox"
            label=""
            style={{ marginRight: '0.5rem' }}
          />
        ) : (
          ''
        );

      return (
        <Card.Body className={classElement} key={i}>
          <div className="cart-item">
            <div className="d-flex justify-content-between align-items-start">
              {checklist}
              <Image src={require('../../assets/images/logo.png').default} fluid />
            </div>
            <div className="cart-content">
              <div>Item Title</div>
              <div className="text-muted">Rp 15.000</div>
            </div>
          </div>
          <div className="cart-qty">x 2</div>
        </Card.Body>
      );
    });
};

const CheckoutBottomCard = props => {
  return (
    <Container
      className="border-top py-3"
      style={{ position: 'absolute', width: '100%', bottom: 0, left: 0 }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <Form.Check
          type="checkbox"
          id="all-checkbox"
          label="Semua"
          style={{ marginRight: '0.5rem' }}
        />
        <div className="btn btn-primary px-4">Checkout (0)</div>
      </div>
    </Container>
  );
};

export { CartList };
export default Cart;
