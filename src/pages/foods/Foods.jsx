import { useState, useEffect } from 'react';
import AddFood from './AddFood';
import Food from './Food';
import axios from 'axios';

function Foods() {
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
      const res = await axios.post(`${BACKEND_URL}/foods`, newFood, config);
      getFoods();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (id) => {
    try {
      setLoading(true);
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
  }, []);

  if (!data) return <h3>No data</h3>;

  if (error) return <h3>{error}</h3>;

  if (loading) return <h3>Loading...</h3>;

  return (
    <>
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
              removeFood={removeFood}
              id={data._id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Foods;
