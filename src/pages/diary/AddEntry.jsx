import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../layout/Loading';

function AddEntry() {
    const [form, setForm] = useState({
        food: '',
        amount: 0,
    });
    const [foods, setFoods] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    const getFoods = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/foods/public`);

            setFoods(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const addEntry = async (form) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json',
            },
        };

        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post(`${BACKEND_URL}/diary`, form, config);
        } catch (err) {
            console.log(err);
        } finally {
            navigate('/diary');
        }
    };

    const onChange = (e) => {
        e.preventDefault();
        setForm((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        addEntry(form);

        setForm({
            food: '',
            amount: 0,
        });
    };

    useEffect(() => {
        getFoods();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Food</label>
                    <select
                        className="inputbox"
                        type="text"
                        name="food"
                        value={form.food}
                        onChange={onChange}
                    >
                        {foods.map((food) => (
                            <option key={food._id} value={food._id}>
                                {food.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Amount</label>
                    <input
                        className="inputbox"
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={onChange}
                    />
                </div>
                <input className="btn btn-primary" type="submit" value="Dodaj" />
            </form>
        </div>
    );
}

export default AddEntry;
