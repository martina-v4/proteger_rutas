import type { IUser } from "./types/IUser";
import type { Rol } from "./types/Rol";
import { getUSer } from "./utils/localStorage";
import { navigate } from "./utils/navigate";

const RUTA_LOGIN = "/src/pages/auth/login/login.html";

const HOME_POR_ROL: Record<Rol, string> = {
  admin: "/src/pages/admin/home/home.html",
  client: "/src/pages/client/home/home.html",
};

// Lee la sesión guardada en "userData". Devuelve null si no hay sesión válida.
const obtenerSesion = (): IUser | null => {
  const raw = getUSer();
  if (!raw) return null;

  try {
    const usuario = JSON.parse(raw) as IUser;
    const rolValido = usuario.role === "admin" || usuario.role === "client";
    return usuario.loggedIn && rolValido ? usuario : null;
  } catch {
    // El JSON está corrupto o fue modificado a mano.
    return null;
  }
};

// Se ejecuta en cada carga de página (incluido el recargar).
export const protegerRuta = (): void => {
  const ruta = window.location.pathname;
  const sesion = obtenerSesion();

  const esZonaAdmin = ruta.includes("/pages/admin/");
  const esZonaClient = ruta.includes("/pages/client/");
  const esZonaAuth = ruta.includes("/pages/auth/");

  // Zonas privadas: hace falta sesión y el rol correcto.
  if (esZonaAdmin || esZonaClient) {
    if (!sesion) {
      navigate(RUTA_LOGIN);
      return;
    }

    const rolRequerido: Rol = esZonaAdmin ? "admin" : "client";
    if (sesion.role !== rolRequerido) {
      navigate(HOME_POR_ROL[sesion.role]); // lo manda a su zona permitida
    }
    return;
  }

  // Login y registro: si ya hay sesión, no tiene sentido mostrarlos.
  if (esZonaAuth && sesion) {
    navigate(HOME_POR_ROL[sesion.role]);
  }
};

protegerRuta();