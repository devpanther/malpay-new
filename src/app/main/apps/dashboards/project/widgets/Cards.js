import React from "react";
import { useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import Button from '@material-ui/core/Button';
import * as firebase from 'firebase';
import swal from 'sweetalert';

const CardList = (props) => {

  let newCard = useSelector(({auth}) => auth.card.error)
  let card = (useSelector(({ auth }) => auth.user.data.cards));
  let deletion = (useSelector(({ auth }) => auth));
  console.log(deletion)

  // for (let key in card) {
  //   console.log(card[key]);
  // }
  

  const completeClick = (element, index) => {
    const userUid = firebase.auth().currentUser.uid;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this card!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.database().ref(`users/${userUid}/data/cards/${element}`).remove();
        swal("Your card has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your card is safe!");
      }
    });
  };

  return (
    <div className="row">
      <div className="col-xl-12 col-lg-12 col-md-12 col-12 ">
        <div className="row" style={{display: "flex", margin: "10px 0"}}>

        
            {card !== null && card !== undefined ? 
             Object.entries(card).map(([element, index]) => {
               console.log(card)
              return (
                <div className="col-4" style={{paddingRight : "8px", textAlign: "center"}}>
                <Cards
                  cvc={index.cvc}
                  expiry={index.expiry}
                  name={index.name}
                  number={index.number}
                />
                <Button color="danger" onClick={() => completeClick(element, index)} style={{color: "red",marginTop: "15px",border: "1px solid red"}}>Delete Card</Button>
                </div>
            )
            })
          : ''}

          {
            newCard.cvc === "000" ? '' : <div className="col-4" style={{paddingRight : "8px", textAlign: "center"}}>
            <Cards
              cvc={newCard.cvc}
              expiry={newCard.expiry}
              name={newCard.name}
              number={newCard.number}
            />
            <Button color="danger" onClick={() => completeClick()} style={{color: "red",marginTop: "15px",border: "1px solid red"}}>Delete Card</Button>
            </div>
          }

          
        </div>
      </div>
    </div>
  )
}

export default withReducer('CardList', reducer)(CardList);