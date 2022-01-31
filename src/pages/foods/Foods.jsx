import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodContext from '../../context/food/FoodContext';
import Food from './Food';

import Loading from '../../layout/Loading';

function Foods() {
    const foodContext = useContext(FoodContext);

    const { getFoods, removeFood, foods, loading, error } = foodContext;

    const navigate = useNavigate();

    useEffect(() => {
        getFoods();
    }, [navigate]);

    if (error) return <h3>{error}</h3>;

    if (loading && !foods) return <Loading />;

    if (!foods) return <h3>No data</h3>;

    return (
        <div className="flex flex-col gap-5">
            <div>
                <button
                    onClick={() => {
                        navigate('/foods/add');
                    }}
                    className="btn bg-gray-100 border-2 border-gray-300 hover:shadow"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>
            <table className="w-full table-auto self-center">
                <thead className="text-left">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>kCal</th>
                        <th>Carbs</th>
                        <th>Fats</th>
                        <th>Protein</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food) => (
                        <Food
                            key={food._id}
                            name={food.name}
                            description={food.description}
                            kcal={food.kcal}
                            carb={food.carb}
                            fat={food.fat}
                            protein={food.protein}
                            removeFood={removeFood}
                            id={food._id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Foods;
