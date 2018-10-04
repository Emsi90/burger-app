import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {

  let modalStyle = [classes.Modal, props.show ? classes.open : ''];

  return(
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div className={modalStyle.join(' ')}>
        {props.children}
      </div>
    </Aux>
  );
}

export default modal;