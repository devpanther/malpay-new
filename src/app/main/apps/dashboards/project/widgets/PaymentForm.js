import React from 'react';
import Cards from 'react-credit-cards';
import 'react-transition-group';
import 'react-credit-cards/es/styles-compiled.css';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addCardToFirebase } from 'app/auth/store/actions/card.actions';
import { useDispatch, useSelector } from 'react-redux';

class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  componentWillMount() {

  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    addCardToFirebase(this.state);
  }



  render() {
    const { success } = this.state;

    return (
      <div id="PaymentForm" style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '10px' }}>
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <div className="row pt-5">
          <form onSubmit={this.handleSubmit}>
            <div className="col-md-12 col-12">
              <Input
                style={{ width: '100%', paddingTop: '8px' }}
                className="w-100 mb-3"
                type="text"
                name="number"
                placeholder="Card Number"
                inputProps={{
                  step: 0.1,
                  min: 10,
                  max: 20
                }}
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>

            <div className="col-md-12 col-12">
              <Input
                style={{ width: '100%', paddingTop: '12px' }}
                className="w-100 mb-3"
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>

            <div className="col-md-12 col-12">
              <Input
                className="w-100 mb-3"
                style={{ width: '100%', paddingTop: '12px' }}
                type="text"
                name="expiry"
                placeholder="Expiry"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>

            <div className="col-md-12 col-12">
              <Input
                className="w-100 mb-3"
                style={{ width: '100%', paddingTop: '12px' }}
                type="text"
                name="cvc"
                placeholder="CVC"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <br />
              <Button style={{ paddingTop: '12px' }} type="submit" variant="contained" color="primary">Submit Card</Button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (auth) => {
  return {
    auth: auth.user
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addCardToFireabse: (model) => dispatch(addCardToFirebase(model))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)