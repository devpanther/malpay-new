const prodConfig = {
    apiKey: "AIzaSyADADgQO_GLtznH5MCqxx5q6lbXKt8OuXg",
    authDomain: "malpay-web.firebaseapp.com",
    databaseURL: "https://malpay-web.firebaseio.com",
    projectId: "malpay-web",
    storageBucket: "malpay-web.appspot.com",
    messagingSenderId: "551893236402",
    appId: "1:551893236402:web:6d4e75b253da8adc7467ab",
    measurementId: "G-7B42MWXH00"
};

const devConfig = {
    apiKey: "AIzaSyADADgQO_GLtznH5MCqxx5q6lbXKt8OuXg",
    authDomain: "malpay-web.firebaseapp.com",
    databaseURL: "https://malpay-web.firebaseio.com",
    projectId: "malpay-web",
    storageBucket: "malpay-web.appspot.com",
    messagingSenderId: "551893236402",
    appId: "1:551893236402:web:6d4e75b253da8adc7467ab",
    measurementId: "G-7B42MWXH00"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
