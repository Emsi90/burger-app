import React, {Component} from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentWillUpdate() {
    console.log('[Modal] will update');
  }

  render() {
    let modalStyle = [classes.Modal, this.props.show ? classes.open : ''];

    return(
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div className={modalStyle.join(' ')}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;