import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBjPXZz-P-p72J815hM02am4AbvtfGf5z0",
  authDomain: "rickandmorty2-37c3b.firebaseapp.com",
  projectId: "rickandmorty2-37c3b",
  storageBucket: "rickandmorty2-37c3b.firebasestorage.app",
  messagingSenderId: "1095794527785",
  appId: "1:1095794527785:web:87b01039813bc2ff161638"
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

      await setDoc(doc(db, 'usuarios', userCred.user.uid), {
        nombre,
        apellido,
        email,
        usuario,
        universo
      });

      alerta.style.display = 'flex'; // Mostrar alerta

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
