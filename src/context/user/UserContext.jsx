import { createContext, useReducer } from 'react';
import axios from 'axios';
import userReducer from './UserReducer';
import useLocalStorage from '../../hooks/useLocalStorage';
import setAxiosToken from '../../setAxiosToken';

const BACKEND_URL = 'http://127.0.0.1:5000/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    token: null,
    authenticated: false,
    loading: false,
    user: {},
    error: null,
  };

  const [token, setToken] = useLocalStorage('token');

  const [state, dispatch] = useReducer(userReducer, initialState);

  const loadUser = async () => {
    if (token) {
      setAxiosToken(token);
    }

    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get(`${BACKEND_URL}/auth`);
      dispatch({ type: 'USER_LOADED', payload: res.data });
      getProfile();
    } catch (err) {
      setToken(null);
      setAxiosToken(null);
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const register = async (username, password, email) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.post(`${BACKEND_URL}/users`, { username, email, password }, config);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
      setToken(res.data.token);
      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg,
      });
    }
  };

  const login = async (username, password) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.post(`${BACKEND_URL}/auth`, { username, password }, config);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      setToken(res.data.token);
      setAxiosToken(res.data.token);
      getProfile();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg,
      });
      setToken(null);
      setAxiosToken(null);
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    setToken(null);
    setAxiosToken(null);
  };

  const getProfile = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.get(`${BACKEND_URL}/auth/profile`);
      dispatch({ type: 'GET_PROFILE', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: err.response.data.msg,
      });
    }
  };

  const updateProfile = async (profile) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await axios.put(`${BACKEND_URL}/auth/profile`, profile, config);
      dispatch({ type: 'UPDATE_PROFILE', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: err.response.data.msg,
      });
    }
  };

  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <UserContext.Provider
      value={{
        ...state,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        getProfile,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
