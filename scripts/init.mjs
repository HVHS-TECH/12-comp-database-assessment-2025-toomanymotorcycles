  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-database.js";
  export { app, database, analytics }
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCeZXZgoV9Mpij9e9dstha_5NpFfOh7-TQ",
    authDomain: "comp-2025-joshua-k-h-project.firebaseapp.com",
    databaseURL: "https://comp-2025-joshua-k-h-project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "comp-2025-joshua-k-h-project",
    storageBucket: "comp-2025-joshua-k-h-project.firebasestorage.app",
    messagingSenderId: "800633378514",
    appId: "1:800633378514:web:3d6f86c8cafba693e1ff0b",
    measurementId: "G-7BEB4GJQV0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const analytics = getAnalytics(app);
