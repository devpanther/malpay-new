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
import axios from "axios";

class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    pin: '',
    status: false,
    otp: '',
    ref: '',
    otpVerified: false
  };

  componentWillMount() {
    console.log(this.props.auth)
    console.log(this.props.users.user.uid)
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
    const userData = {
      pin: this.state.pin,
      number: this.state.number,
      expiry: this.state.expiry,
      name: this.state.name,
      cvv: this.state.cvc,
      email: this.props.auth.email
    }
    axios
          .post("http://localhost:5000/api/users/pay-otp", userData)
          .then(res => {
            console.log(res.data.data.status);
            this.setState({status: res.data.data.status})
            this.setState({ref: res.data.data.reference})
          })
          .catch(err =>
            console.log(err)
          );
  }

  handleOTPSubmit = (e) => {
    e.preventDefault();
    const userData = {
      otp: this.state.otp,
      reference: this.state.ref,
      key: this.props.users.user.uid
    }
    axios
          .post("http://localhost:5000/api/users/otp-check", userData)
          .then(res => {
            console.log(res.data.data.status)
            this.setState({otpVerified: res.data.data.status})
            if(res.data.data.status === 'success'){
              addCardToFirebase(this.state);
              setTimeout(() => {
                window.location.reload();
                },1000)
            }
          })
          .catch(err =>
            console.log(err)
          );
  }



  render() {
    const { success } = this.state;
    return (
      <div>
      {this.state.status === 'success' ? <div> {this.state.otpVerified === 'success' ? <div className="row pt-5" style={{backgroundColor: 'white', padding: '40px', borderRadius: '20px'}}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                                            <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                                            <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                                          </svg><br />
                                          <p class="success">Card Added Succesfully!</p></div>
                                           : <div id="PaymentForm" style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '10px' }}>

<div className="row pt-5">
  <form onSubmit={this.handleOTPSubmit}>
    <div className="col-md-12 col-12">
      <Input
        className="w-100 mb-3"
        style={{ width: '100%', paddingTop: '12px' }}
        type="text"
        name="otp"
        inputProps={{ maxLength: 6 }}
        placeholder="OTP"
        onChange={this.handleInputChange}
        onFocus={this.handleInputFocus}
      />
      <br />
      <span style={{color: 'red',margin: '5px'}}>Input OTP to verify your Card</span>
      <Button style={{ paddingTop: '12px' }} type="submit" variant="contained" color="primary">Verify OTP</Button>
    </div>

  </form>
</div>
</div>}</div> : <div id="PaymentForm" style={{ backgroundColor: 'white', padding: '15px 20px', borderRadius: '10px' }}>
      
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
              pattern="\d*"
              inputProps={{ maxLength: 16 }}
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
              inputProps={{ maxLength: 4 }}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>

          <div className="col-md-12 col-12">
            <Input
              className="w-100 mb-3"
              style={{ width: '100%', paddingTop: '12px' }}
              type="text"
              name="pin"
              placeholder="PIN"
              inputProps={{ maxLength: 4 }}
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
              inputProps={{ maxLength: 3 }}
              placeholder="CVC"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <br />
            <Button style={{ paddingTop: '12px' }} type="submit" variant="contained" color="primary">Submit Card</Button>
          </div>

        </form>
      </div>
    </div>}
    </div>
    );
  }
}

const mapStateToProps = (auth, users) => {
  return {
    auth: auth.auth.user.data,
    users: auth.auth
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addCardToFireabse: (model) => dispatch(addCardToFirebase(model))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm)