const KEY = "tp2_username_v1";
export function getUserName() {
  return localStorage.getItem(KEY) || "Samer";
}
export function setUserName(name) {
  localStorage.setItem(KEY, name);
}
