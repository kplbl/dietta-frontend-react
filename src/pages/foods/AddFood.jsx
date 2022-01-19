import { useState } from 'react';

const AddFood = ({ addFood, getFoods }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        kcal: 0,
        carb: 0,
        fat: 0,
        protein: 0,
        is_public: true,
    });

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        addFood(form);
        getFoods();

        setForm({
            name: '',
            description: '',
            kcal: 0,
            carb: 0,
            fat: 0,
            protein: 0,
            is_public: true,
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Ime</label>
                <input
                    className="inputbox"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Opis</label>
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
                <label>Hidrati</label>
                <input
                    className="inputbox"
                    type="number"
                    name="carb"
                    value={form.carb}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Maščoba</label>
                <input
                    className="inputbox"
                    type="number"
                    name="fat"
                    value={form.fat}
                    onChange={onChange}
                />
            </div>
            <div>
                <label>Beljakovine</label>
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
            <input className="btn btn-primary" type="submit" value="Dodaj" />
        </form>
    );
};

export default AddFood;
