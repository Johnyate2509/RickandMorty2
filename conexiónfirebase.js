import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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

      // En vez de alert(), mostramos el modal:
      alerta.style.display = 'flex';

      // Reseteamos el formulario solo cuando cierre la alerta:
      btnCerrar.onclick = () => {
        alerta.style.display = 'none';
        form.reset();
      };

    } catch (error) {
      alert('Error al registrar: ' + error.message);
      console.error(error);
    }
  });
// Mostrar alerta
alerta.classList.add('active');

// Ocultar alerta
alerta.classList.remove('active');

});
