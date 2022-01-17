import { useState } from 'react';

function AddEntry({ foods, addEntry }) {
  const [form, setForm] = useState({
    food: '',
    amount: 0,
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEntry(form);
    setForm({
      food: '',
      amount: 0,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label>Ime</label>
          <select
            className="inputbox"
            type="text"
            name="food"
            value={form.food}
            onChange={onChange}
          >
            {foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Opis</label>
          <input
            className="inputbox"
            type="number"
            name="amount"
            value={form.amount}
            onChange={onChange}
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Dodaj" />
      </form>
    </div>
  );
}

export default AddEntry;
