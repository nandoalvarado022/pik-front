import firebase from 'firebase'

export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "BHS6d5MF8NzWM16yyZsWWioFgD6vY5THMqU9Cz_iyfagVWBKi_g6oMNZtmATTOUkYLlv0QKJOCJ7L76_nzQMhzg"
    });

    navigator.serviceWorker
    .register('../public/firebase-messaging-sw.js')
    .then((registration) => {
        firebase.messaging().useServiceWorker(registration);
    });
}

export const preguntaNotificaciones = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('token do usuário:', token);

        return token;
    } catch (error) {
        console.error(error);
    }
}