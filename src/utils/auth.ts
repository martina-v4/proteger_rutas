import { removeUser } from "./localStorage";
import { navigate } from "./navigate";

export const logout = (): void => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};