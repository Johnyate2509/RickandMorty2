import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBCJXeinurb2klueon_QMpwanb8uMy7s1E",
  authDomain: "rickandmorty-a77e9.firebaseapp.com",
  projectId: "rickandmorty-a77e9",
  storageBucket: "rickandmorty-a77e9.firebasestorage.app",
  messagingSenderId: "996378141670",
  appId: "1:996378141670:web:f441b528bb30766e1f6c27"
};

// Inicialización de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Manejo del formulario de registro
const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = registerForm.nombre.value.trim();
  const apellido = registerForm.apellido.value.trim();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value;
  const usuario = registerForm.usuario.value.trim();
  const universo = registerForm.universo.value;

  try {
    // Crear usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar datos adicionales en Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      nombre,
      apellido,
      email,
      usuario,
      universo,
      uid: user.uid,
      creadoEn: new Date()
    });

    alert('¡Usuario registrado con éxito!');
    registerForm.reset();
  } catch (error) {
    console.error('Error en el registro:', error);
    alert(`Error: ${error.message}`);
  }
});
