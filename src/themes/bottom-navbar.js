import React from 'react';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const BottomNavbar = () => {
  return (
    <div className="bottom-nav">
      <Link to="/cart" className="main-nav">
        <FontAwesomeIcon icon={faCartPlus} />
      </Link>
    </div>
  );
};

export default BottomNavbar;
