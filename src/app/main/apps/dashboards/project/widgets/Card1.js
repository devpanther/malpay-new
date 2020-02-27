import React from "react";
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import { connect } from 'react-redux'
import { useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';

const Card1 = (props) => {
  const card = useSelector(({ auth }) => auth.card.error);
  console.log(card)
  return (
    <Cards
      cvc={card.cvc}
      expiry={card.expiry}
      focused={true}
      name={card.name}
      number={card.number}
    />

  )
}


export default withReducer('Card1', reducer)(Card1);