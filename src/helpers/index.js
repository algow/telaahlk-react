export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('Y_Y'));

  if(!user) {
    return false;
  }
  return true;
}

export const setUserData = (userData) => {
  localStorage.setItem('Y_Y', JSON.stringify(userData));
}

export const getUserData = () => {
  return JSON.parse(localStorage.getItem('Y_Y'));
}

export const removeUserData = () => {
  localStorage.removeItem('Y_Y');
}