import React from 'react';

const Spinner = ({ width, height }) => (
  <div className="text-center">
    <div className="spinner-border text-primary-color" style={{ width: `${width || '4rem'}`, height: `${height || '4rem'}`}} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Spinner;
