import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBjPXZz-P-p72J815hM02am4AbvtfGf5z0",
  authDomain: "rickandmorty2-37c3b.firebaseapp.com",
  projectId: "rickandmorty2-37c3b",
  storageBucket: "rickandmorty2-37c3b.firebasestorage.app",
  messagingSenderId: "1095794527785",
  appId: "1:1095794527785:web:87b01039813bc2ff161638"
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

    alert('¡Ya eres parte del universo de Rick and Morty!');
    registerForm.reset();
  } catch (error) {
    console.error('Error en el registro:', error);
    alert(`Error: ${error.message}`);
  }
});
