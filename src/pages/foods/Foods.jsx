import { useState, useEffect } from 'react';
import AddFood from './AddFood';
import Food from './Food';
import axios from 'axios';

function Foods() {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const BACKEND_URL = 'http://127.0.0.1:5000/api';

  const getFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/foods/public`);
      console.log(res);
      setData(res.data);
    } catch (err) {
      setError(err);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoods();
  }, []);

  if (!data) return <h2>No data</h2>;

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
        <button className="btn bg-red-400 text-gray-100">Remove</button>
      </div>
    </div>
  );
}

export default Foods;
