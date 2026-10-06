import type { IUser } from "../../../types/IUser";
import { findUserByEmail, saveUser, seedAdmin } from "../../../utils/localStorage";
import { navigate } from "../../../utils/navigate";

// Crea el admin de prueba si todavía no existe.
seedAdmin();

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

const mostrarError = (texto: string): void => {
  mensaje.textContent = texto;
  mensaje.style.color = "red";
};

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const email = inputEmail.value.trim();
  const password = inputPassword.value;

  if (!email || !password) {
    mostrarError("Completá email y contraseña.");
    return;
  }

  const usuario = findUserByEmail(email);

  if (!usuario || usuario.password !== password) {
    mostrarError("Email o contraseña incorrectos.");
    return;
  }

  // Primero se guarda la sesión...
  const sesion: IUser = {
    email: usuario.email,
    role: usuario.role,
    loggedIn: true,
  };
  saveUser(sesion);

  // ...y después se redirige según el rol.
  if (usuario.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/client/home/home.html");
  }
});