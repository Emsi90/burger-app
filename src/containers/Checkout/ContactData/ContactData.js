import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/validation';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        errorMessage: 'Please enter valid Name',
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        errorMessage: 'Please enter valid Street',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIPCODE'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true
        },
        errorMessage: 'Please enter valid ZIP-CODE e.g. XX-XXX',
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        errorMessage: 'Please enter valid Country',
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        errorMessage: 'Please enter valid E-Mail',
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        valid: true,
        validation: {},
        value: 'fastest'
      }
    },
    formIsValid: false,
    // loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    // this.setState({loading: true});
    const formData = {};
    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);

    // axios.post('/orders.json', order)
    // .then(response => {
    //   console.log(response);
    //   this.setState({loading: false});
    //   this.props.history.push('/');
    // })
    // .catch(error => {
    //   console.log(error);
    //   this.setState({loading: false});
    // });
  }

  // checkValidity(value, rules) {
  //   let isValid = true;

  //   if(!rules) {
  //     return true;
  //   }

  //   if(rules.required) {
  //     isValid = value.trim() !== '' && isValid;
  //   }

  //   if(rules.minLength) {
  //     isValid = value.length >= rules.minLength && isValid;
  //   }

  //   if(rules.maxLength) {
  //     isValid = value.length <= rules.maxLength && isValid;
  //   }

  //   if (rules.isEmail) {
  //     const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  //     isValid = pattern.test(value) && isValid
  //   }

  //   if (rules.isNumeric) {
  //       const pattern = /^\d+$/;
  //       isValid = pattern.test(value) && isValid
  //   }

  //   return isValid;
  // }

  inputChangedHandler = (e, inputIdentifier) => {
    console.log(e.target.value);
    const updateOrderForm = {
      ...this.state.orderForm
    };
    const updateFormElement = {
      ...updateOrderForm[inputIdentifier]
    };
    updateFormElement.value = e.target.value;
    updateFormElement.valid = checkValidity(updateFormElement.value, updateFormElement.validation);
    updateFormElement.touched = true;
    updateOrderForm[inputIdentifier] = updateFormElement;

    let formIsValid = true;
    for(let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});

  }

  render () {
    console.log(this.props.ings);

    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>

        {/* <Input elementType="..." elementType="..." value="..."/> */}
        {formElementsArray.map(formElement => (
          <Input
          key={formElement.id}
          // label={formElement.config.elementConfig.placeholder}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          errorMessage={formElement.config.errorMessage}
          shouldValidate={formElement.config.validation}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if(this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapToPropsState = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
};

export default connect(mapToPropsState, mapDispatchToProps)(withErrorHandler(ContactData, axios));
