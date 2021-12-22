const userReducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload,
      };
    case 'GET_PROFILE':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case 'PROFILE_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'CLEAR_LOADING':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
