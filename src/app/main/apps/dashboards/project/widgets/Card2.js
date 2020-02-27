import React from "react";
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';


export default class Card1 extends React.Component {
  state = {
    cvc: '472',
    expiry: '',
    focus: '',
    name: 'Robert Johnson',
    number: '471',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }
  
render () {
  return (
    <Cards
    cvc={this.state.cvc}
    expiry={this.state.expiry}
    focused={this.state.focus}
    name={this.state.name}
    number={this.state.number}
  />

  )
}
}