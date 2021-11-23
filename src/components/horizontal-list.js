import React from 'react';

const HorizontalList = props => {
  const { height, children } = props;
  return (
    <>
      <div className="sticky-card-container" style={{ top: height }}>
        {children ? children : ''}
      </div>
    </>
  );
};

export default HorizontalList;
