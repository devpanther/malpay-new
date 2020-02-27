import firebaseService from 'app/services/firebaseService';
import * as UserActions from './user.actions';
import * as Actions from 'app/store/actions';
import jwtService from 'app/services/jwtService';
import 'firebase/auth';
import firebase from 'firebase/app';
import swal from 'sweetalert';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';


export function submitRegister({ displayName, password, email }) {
    return (dispatch) =>
        jwtService.createUser({
            displayName,
            password,
            email
        })
            .then((user) => {
                dispatch(UserActions.setUserData(user));
                return dispatch({
                    type: REGISTER_SUCCESS
                });
            }
            )
            .catch(error => {
                return dispatch({
                    type: REGISTER_ERROR,
                    payload: error
                });
            });
}

export function registerWithFirebase(model) {
    const { email, password, displayName } = model;
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.createUserWithEmailAndPassword(email, password)
            .then(response => {

                dispatch(UserActions.createUserSettingsFirebase({
                    ...response.user,
                    displayName,
                    email
                }));

                const user = response.user
                user.sendEmailVerification({
                    url: "http://malpay-web.firebaseapp.com/signin"
                }).then(function () {
                    swal({
                        title: "Verification Email Sent!",
                        text: "Please, Check Your Email for Confirmation",
                        icon: "success",
                        dangerMode: true,
                    });

                    // setTimeout(function () {
                    //     const url = "http://malpay-web.firebaseapp.com/signin";
                    //     window.location.href = url
                    // }, 1000);

                }).catch(function (error) {
                    swal({
                        title: error,
                        icon: "danger",
                        dangerMode: true,
                    });
                });

                return dispatch({
                    type: REGISTER_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];

                const emailErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email'
                ];

                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    email: emailErrorCodes.includes(error.code) ? error.message : null,
                    displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if (error.code === 'auth/invalid-api-key') {
                    dispatch(Actions.showMessage({ message: error.message }));
                }

                return dispatch({
                    type: REGISTER_ERROR,
                    payload: response
                });
            });
}
