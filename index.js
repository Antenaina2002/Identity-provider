const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "authentication-2702.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "authentication-2702.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    res.status(201).json({ message: "Utilisateur créé avec succès", user: userCredential.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: "Connexion réussie", user: userCredential.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});