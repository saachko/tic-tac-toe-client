import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div className="loader-background">
      <Spinner
        animation="border"
        variant="primary"
        style={{
          width: '4rem',
          height: '4rem',
        }}
        className="loader"
        role="status"
      />
    </div>
  );
}

export default Loader;
