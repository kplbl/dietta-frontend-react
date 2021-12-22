import Navbar from './layout/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Diary from './pages/diary/Diary';
import Foods from './pages/foods/Foods';
import Profile from './pages/profile/Profile';
import LoginForm from './pages/user/LoginForm';
import RegisterForm from './pages/user/RegisterForm';
import { UserProvider } from './context/user/UserContext';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/foods" element={<Foods />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
