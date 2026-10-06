import type { IUserRegistrado } from "../../../types/IUserRegistrado";
import { addUser, seedAdmin } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

// Asegura que exista el admin de prueba (así nadie puede registrar su email como cliente).
seedAdmin();

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

const mostrarMensaje = (texto: string, esError: boolean): void => {
  mensaje.textContent = texto;
  mensaje.style.color = esError ? "red" : "green";
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value;

  if (!email || !password) {
    mostrarMensaje("Completá todos los campos.", true);
    return;
  }

  if (password.length < 6) {
    mostrarMensaje("La contraseña debe tener al menos 6 caracteres.", true);
    return;
  }

  const nuevoUsuario: IUserRegistrado = {
    email,
    password,
    role: "client",
  };

  const creado = addUser(nuevoUsuario);

  if (!creado) {
    mostrarMensaje("Ese email ya está registrado.", true);
    return;
  }

  mostrarMensaje("Registro exitoso. Redirigiendo al login...", false);
  form.reset();

  setTimeout(() => {
    navigate("/src/pages/auth/login/login.html");
  }, 1200);
});