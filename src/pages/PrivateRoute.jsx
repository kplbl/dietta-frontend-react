import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/user/UserContext';
import Loading from '../layout/Loading';
const PrivateRoute = () => {
  const { authenticated, loading } = useContext(UserContext);

  if (loading) {
    return <Loading />;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
