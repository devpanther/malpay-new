import React from "react";
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import { useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';

const Card1 = ({ card }) => {
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


export default Card1;