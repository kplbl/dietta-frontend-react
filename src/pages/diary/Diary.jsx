import axios from 'axios';
import { useState, useEffect } from 'react';
import Entry from './Entry';
import Targets from './Targets';

function Diary() {
  const [entries, setEntries] = useState(null);
  const [foods, setFoods] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(false);

  const BACKEND_URL = 'http://127.0.0.1:5000/api';

  const getEntries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/diary`);
      console.log(res.data);
      setEntries(res.data);
    } catch (err) {
      setError(err);
      setEntries(null);
    } finally {
      setLoading(false);
    }
  };

  const getFoods = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/foods/public`);
      console.log(res.data);
      setFoods(res.data);
    } catch (err) {
      setError(err);
      setFoods(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEntries();
    getFoods();
  }, []);

  return (
    <div>
      <h3>Dnevnik</h3>
      {entries && <Targets />}
      {entries && (
        <table>
          <thead>
            <tr>
              <th>Hrana</th>
              <th>Količina</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entries) => (
              <Entry
                key={entries._id}
                //  food={foods.find((food) => food._id === entries.food).name}
                amount={entries.amount}
                selectedRow={selectedRow}
                setSelected={setSelectedRow}
                id={entries._id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Diary;
