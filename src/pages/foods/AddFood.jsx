import { useState, useContext } from 'react';
import FoodContext from '../../context/food/FoodContext';
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

    const foodContext = useContext(FoodContext);

    const { addFood } = foodContext;

    const navigate = useNavigate();

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
        <form onSubmit={onSubmit} className="flex flex-col gap-2 max-w-xl mx-auto">
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
                <label>Public </label>
                <input
                    type="checkbox"
                    name="is_public"
                    value={form.is_public}
                    onChange={onChange}
                />
            </div>
            <div className="flex justify-between mt-5">
                <input className="btn btn-primary" type="submit" value="Add" />
                <input className="btn btn-primary" type="submit" value="Cancel" />
            </div>
        </form>
    );
};

export default AddFood;
