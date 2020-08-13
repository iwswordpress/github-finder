import React from 'react';

const Alert = ({ alert, closeAlert }) => {
  return (
    alert && (
      <div
        className={`alert alert-$alert.type}`}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span>
          <i className='fa fa-info' />
          &nbsp;
          {alert.msg}{' '}
        </span>
        <span onClick={closeAlert}>X CLOSE</span>
      </div>
    )
  );
};
export default Alert;
