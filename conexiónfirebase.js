import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBCJXeinurb2klueon_QMpwanb8uMy7s1E",
  authDomain: "rickandmorty-a77e9.firebaseapp.com",
  projectId: "rickandmorty-a77e9",
  storageBucket: "rickandmorty-a77e9.appspot.com", // corregido
  messagingSenderId: "996378141670",
  appId: "1:996378141670:web:f441b528bb30766e1f6c27"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const alerta = document.getElementById('registro-alerta');
  const btnCerrar = document.getElementById('cerrar-alerta');

  if (!form) {
    console.warn("Formulario de registro no encontrado.");
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
      console.log("Usuario creado:", userCred.user.uid);

      await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        nombre,
        apellido,
        email,
        usuario,
        universo
      });
      console.log("Documento guardado en Firestore");

      alerta.style.display = 'flex';

      btnCerrar.onclick = () => {
        alerta.style.display = 'none';
        form.reset();
      };

    } catch (error) {
      alert('Error al registrar: ' + error.message);
      console.error(error);
    }
  });
});
