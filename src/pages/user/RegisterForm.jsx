import { useContext, useState } from 'react';
import UserContext from '../../context/user/UserContext';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
        email: '',
    });
    const userContext = useContext(UserContext);

    const { register } = userContext;

    const navigate = useNavigate();

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        register(form.username, form.password, form.email);
        navigate('/');
    };

    return (
        <div className="w-96">
            <form onSubmit={onSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4 space-y-6">
                <div className="">
                    <label className="block text-sm text-gray-500">Uporabniško ime</label>
                    <input className="inputbox" type="text" name="username" onChange={onChange} />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Geslo</label>
                    <input
                        className="inputbox"
                        type="password"
                        name="password"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-500">Email</label>
                    <input className="inputbox" type="email" name="email" onChange={onChange} />
                </div>
                <div className="flex justify-between">
                    <button className="btn btn-primary">Registriraj se</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
