// Read all registered users from localStorage
export const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');

// Save all registered users to localStorage
export const saveUsers = (users) => localStorage.setItem('users', JSON.stringify(users));

// Get currently logged-in user from session
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

// Set currently logged-in user session
export const setCurrentUser = (user) => localStorage.setItem('currentUser', JSON.stringify(user));

// Clear logged-in user session
export const logoutUser = () => localStorage.removeItem('currentUser');
