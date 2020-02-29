import config from './firebaseServiceConfig';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { AUTH_CONFIG } from '../auth0Service/auth0ServiceConfig';

export class firebaseService {

    init() {
        if (Object.entries(AUTH_CONFIG).length === 0 && AUTH_CONFIG.constructor === Object) {
            if (process.env.NODE_ENV === 'development') {
                console.warn("Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js");
            }
            return;
        }

        if (firebase.apps.length) {
            return;
        }
        firebase.initializeApp(config);
        this.db = firebase.database();
        this.auth = firebase.auth();
    }

    getUserData = (userId) => {
        if (!firebase.apps.length) {
            return;
        }
        return new Promise((resolve, reject) => {
            this.db.ref(`users/${userId}`)
                .once('value')
                .then((snapshot) => {
                    const user = snapshot.val();
                    resolve(user);
                });
        });
    };


    getCardData = () => {
        let ref = this.db.ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            return state.cards;
        });
        console.log('DATA RETRIEVED');
    }

    updateUserData = (user) => {
        if (!firebase.apps.length) {
            return;
        }
        return this.db.ref(`users/${user.uid}`)
            .set(user);
    };

    updateCardData = (user) => {
        if (!firebase.apps.length) {
            return;
        }
        return this.db.ref(`users/${user.uid}/data/cards`)
            .push(user.data).then((snap) => {
                const key = snap.key
            })
    };

    onAuthStateChanged = (callback) => {
        if (!this.auth) {
            return;
        }
        this.auth.onAuthStateChanged(callback);
    };

    signOut = () => {
        if (!this.auth) {
            return;
        }
        this.auth.signOut();
    }
}

const instance = new firebaseService();

export default instance;