import firebase from 'firebase';

const firebaseConfig = {
   apiKey: "AIzaSyA9lGoJZZFr1lIXu6Ms3XaAVVOa-hdikkk",
    authDomain: "saaslaundry.firebaseapp.com",
    databaseURL: "https://saaslaundry.firebaseio.com",
    projectId: "saaslaundry",
    storageBucket: "saaslaundry.appspot.com",
    messagingSenderId: "211386581190",
    appId: "1:211386581190:web:af12986abd4fd0e15857c7",
    measurementId: "G-Q3Y781MVXD"
  };

firebase.initializeApp(firebaseConfig);
export default firebase