import type { Rol } from "./Rol";

export interface IUserRegistrado {
  email: string;
  password: string;
  role: Rol;
}