import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './user.actions';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';

export const ADD_CARD_ERROR = 'ADD_CARD_ERROR';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';


export function addCardToFirebase(model) {
    const { name, number, cvc, expiry } = model;
    (UserActions.addCardFirebaseAuthUser({
        name,
        number,
        cvc,
        expiry
    }))
}
