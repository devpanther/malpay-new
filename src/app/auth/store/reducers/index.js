import { combineReducers } from 'redux';
import user from './user.reducer';
import login from './login.reducer';
import register from './register.reducer';
import card from './card.reducer'

const authReducers = combineReducers({
    user,
    login,
    register,
    card
});

export default authReducers;