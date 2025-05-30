// conexiónfirebase.js o script.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCJXeinurb2klueon_QMpwanb8uMy7s1E",
  authDomain: "rickandmorty-a77e9.firebaseapp.com",
  projectId: "rickandmorty-a77e9",
  storageBucket: "rickandmorty-a77e9.firebasestorage.app",
  messagingSenderId: "996378141670",
  appId: "1:996378141670:web:f441b528bb30766e1f6c27"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  if (!form) {
    console.warn('❗ No se encontró el formulario');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = form.nombre.value;
    const apellido = form.apellido.value;
    const email = form.email.value;
    const password = form.password.value;
    const usuario = form.usuario.value;
    const universo = form.universo.value;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        nombre,
        apellido,
        email,
        usuario,
        universo
      });

      alert('¡Ya eres parte del universo de Rick and Morty!');
      form.reset();
    } catch (error) {
      alert('Error: ' + error.message);
      console.error(error);
    }
  });
});
