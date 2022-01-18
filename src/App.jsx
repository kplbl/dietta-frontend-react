import Navbar from './layout/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Diary from './pages/diary/Diary';
import Foods from './pages/foods/Foods';
import Profile from './pages/profile/Profile';
import LoginForm from './pages/user/LoginForm';
import RegisterForm from './pages/user/RegisterForm';
import { useEffect, useContext } from 'react';
import UserContext from './context/user/UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  const userContext = useContext(UserContext);
  const { loadUser } = userContext;

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/profile" element={<PrivateRoute />}>
              {/* to je outlet v private routu */}
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/foods" element={<PrivateRoute />}>
              <Route path="/foods" element={<Foods />} />
            </Route>
            <Route path="/diary" element={<PrivateRoute />}>
              <Route path="/diary" element={<Diary />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
