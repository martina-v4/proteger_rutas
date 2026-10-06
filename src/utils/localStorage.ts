import type { IUser } from "../types/IUser";
import type { IUserRegistrado } from "../types/IUserRegistrado";

const USERS_KEY = "users";
const USER_DATA_KEY = "userData";

// ---------- Sesión activa ("userData") ----------

export const saveUser = (user: IUser): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const getUSer = (): string | null => {
  return localStorage.getItem(USER_DATA_KEY);
};

export const removeUser = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

// ---------- Usuarios registrados ("users") ----------

export const getUsers = (): IUserRegistrado[] => {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as IUserRegistrado[];
  } catch {
    return [];
  }
};

export const saveUsers = (users: IUserRegistrado[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): IUserRegistrado | undefined => {
  const emailNormalizado = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === emailNormalizado);
};

// Devuelve false si el email ya está registrado (evita duplicados).
export const addUser = (user: IUserRegistrado): boolean => {
  if (findUserByEmail(user.email)) {
    return false;
  }

  const users = getUsers();
  users.push({ ...user, email: user.email.trim().toLowerCase() });
  saveUsers(users);
  return true;
};

// Crea un administrador por defecto para poder probar la zona /admin/.
// Si ya existe, no hace nada.
export const seedAdmin = (): void => {
  addUser({ email: "admin@foodstore.com", password: "admin123", role: "admin" });
};