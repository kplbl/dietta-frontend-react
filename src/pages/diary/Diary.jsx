import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '../../layout/Loading';
import Entry from './Entry';
import Targets from './Targets';
import AddEntry from './AddEntry';

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
      const res = await axios.get(`${BACKEND_URL}/diary/today`);

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
      setFoods(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entry) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
      },
    };

    try {
      setLoading(true);
      const res = await axios.post(`${BACKEND_URL}/diary`, entry, config);

      // dont just put the returned entry into state, it doesn't
      // contain the name and other data, just the id string of the food
      // just get all entries, the data is added on the backend
      //setEntries((prevState) => [...prevState, res.data]);
      getEntries();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEntries();
    getFoods();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      {foods && <AddEntry foods={foods} addEntry={addEntry} />}

      <h3>Dnevnik</h3>
      {entries && <Targets entries={entries} />}
      {entries && (
        <table>
          <thead>
            <tr>
              <th>Hrana</th>
              <th>Količina</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <Entry
                key={entry._id}
                food={entry.food.name}
                amount={entry.amount}
                selectedRow={selectedRow}
                setSelected={setSelectedRow}
                id={entry._id}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Diary;
