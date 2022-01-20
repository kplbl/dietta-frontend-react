import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        kcal: 0,
        carb: 0,
        fat: 0,
        protein: 0,
        is_public: true,
    });

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    const addFood = async (newFood) => {
        const config = {
            headers: {
                'Content-Type': 'Application/json',
            },
        };
        try {
            // eslint-disable-next-line no-unused-vars
            const res = await axios.post(`${BACKEND_URL}/foods`, newFood, config);
        } catch (err) {
            console.log(err);
        }
    };

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        addFood(form);
        setForm({
            name: '',
            description: '',
            kcal: 0,
            carb: 0,
            fat: 0,
            protein: 0,
            is_public: true,
        });
        navigate('/foods');
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Name</label>
                <input
                    className="inputbox"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Description</label>
                <input
                    className="inputbox"
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>kCal</label>
                <input
                    className="inputbox"
                    type="number"
                    name="kcal"
                    value={form.kcal}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Carbohydrates</label>
                <input
                    className="inputbox"
                    type="number"
                    name="carb"
                    value={form.carb}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Fat</label>
                <input
                    className="inputbox"
                    type="number"
                    name="fat"
                    value={form.fat}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Protein</label>
                <input
                    className="inputbox"
                    type="number"
                    name="protein"
                    value={form.protein}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Public</label>
                <input
                    type="checkbox"
                    name="is_public"
                    value={form.is_public}
                    onChange={onChange}
                />
            </div>
            <div className="flex justify-between">
                <input className="btn btn-primary" type="submit" value="Add" />
                <input className="btn bg-red-400" type="submit" value="Cancel" />
            </div>
        </form>
    );
};

export default AddFood;
