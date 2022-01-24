import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Food from './Food';
import axios from 'axios';
import Loading from '../../layout/Loading';

function Foods() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_API_URL;

    const getFoods = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/foods/public`);
            setData(res.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const removeFood = async (id) => {
        try {
            setLoading(true);
            // eslint-disable-next-line no-unused-vars
            const res = await axios.delete(`${BACKEND_URL}/foods/${id}`);
            getFoods();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFoods();
    }, [navigate]);

    if (error) return <h3>{error}</h3>;

    if (loading && !data) return <Loading />;

    if (!data) return <h3>No data</h3>;

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
                    {data.map((data) => (
                        <Food
                            key={data._id}
                            name={data.name}
                            description={data.description}
                            kcal={data.kcal}
                            carb={data.carb}
                            fat={data.fat}
                            protein={data.protein}
                            removeFood={removeFood}
                            id={data._id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Foods;
