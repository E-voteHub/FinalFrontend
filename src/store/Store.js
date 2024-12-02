import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../reducers/loginReducer';
import usernameReducer from '../reducers/usernameReducer'
// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    login: loginReducer,
    username : usernameReducer,
  },
});

// Subscribe to store updates to save login state to localStorage 
let previousUsername = JSON.stringify(store.getState().username.username);

store.subscribe(() => {
  const currentUsername = JSON.stringify(store.getState().username.username);

  if (previousUsername !== currentUsername) {
    localStorage.setItem('username', currentUsername);
    previousUsername = currentUsername;
  }

  // Always update isLoggedIn as needed
  localStorage.setItem('isLoggedIn', JSON.stringify(store.getState().login.isLoggedIn));
});


export default store;
