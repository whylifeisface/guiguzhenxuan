export const SET_TOKEN = (token: string) => {
  localStorage.setItem("TOKEN", token);
};
export const GET_TOKEN = (): string | null => {
  return localStorage.getItem("TOEKN");
};
export const REMOVE_TOKEN = () => {
  localStorage.removeItem("Token");
};
