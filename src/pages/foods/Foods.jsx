import { useState, useEffect } from 'react';
import AddFood from './AddFood';
import Food from './Food';
import axios from 'axios';

function Foods() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = 'http://127.0.0.1:5000/api';

  const getFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/foods/public`);

      setData(res.data);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (newFood) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };
    try {
      setLoading(true);
      const res = axios.post(`${BACKEND_URL}/foods`, newFood, config);
      setData(res.data);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${BACKEND_URL}/foods/${id}`);

      setData(data.filter((food) => food._id !== id));
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const onRemove = () => {
    if (selected !== null) {
      removeFood(selected);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (!data) return <h3>No data</h3>;

  if (error) return <h3>{error}</h3>;

  if (loading) return <h3>Loading...</h3>;

  return (
    <div className="container mx-auto">
      <AddFood addFood={addFood} getFoods={getFoods} />
      <table>
        <thead>
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
              selected={selected}
              setSelected={setSelected}
              id={data._id}
            />
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={onRemove} className="btn bg-red-400 text-gray-100">
          Remove
        </button>
      </div>
    </div>
  );
}

export default Foods;
