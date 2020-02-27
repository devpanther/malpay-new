import * as Actions from '../actions';

const initialState = {
    success: false,
    error: {
        name: "Name",
        number: "000",
        expiry: "0000",
        cvc: "000"
    }
};

const card = function (state = initialState, action) {
    switch (action.type) {
        case Actions.ADD_CARD_SUCCESS:
            {
                return {
                    success: true,
                    error: action.payload
                };
            }
        case Actions.ADD_CARD_ERROR:
            {
                return {
                    success: false,
                    error: action.payload
                };
            }
        default:
            {
                return state
            }
    }
};

export default card;