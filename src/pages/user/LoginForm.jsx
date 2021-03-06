import { useContext } from 'react';
import { useState } from 'react';
import UserContext from '../../context/user/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    const userContext = useContext(UserContext);

    const { login } = userContext;

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        login(form.username, form.password);
        navigate('/');
    };

    return (
        <div className="w-96">
            <form onSubmit={onSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4 space-y-6">
                <div className="">
                    <label className="block text-sm text-gray-500">Username</label>
                    <input className="inputbox" type="text" name="username" onChange={onChange} />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Password</label>
                    <input
                        className="inputbox"
                        type="password"
                        name="password"
                        onChange={onChange}
                    />
                </div>
                <div className="flex justify-between">
                    <button className="btn btn-primary">Log in</button>
                    <Link to="/register" className="btn btn-primary">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
