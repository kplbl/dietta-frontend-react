import { useContext, useState } from 'react';
import UserContext from '../../context/user/UserContext';

function Profile() {
  const userContext = useContext(UserContext);
  const { updateProfile, user, authenticated, loading } = userContext;

  //   const [form, setForm] = useState({
  //     username: '',
  //     email: '',
  //     gender: '',
  //     weight: 0,
  //     height: 0,
  //     body_fat_percentage: 0,
  //     calorie_budget: 0,
  //     protein_target: 0,
  //     fat_target: 0,
  //     carb_target: 0,
  //     diet_type: '',
  //   });

  const [form, setForm] = useState(user);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    console.log(form);
    e.preventDefault();
    updateProfile(form);
  };

  if (loading) {
    return <div>Profile</div>;
  }

  return (
    <div className="w-96">
      <form onSubmit={onSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4 space-y-6">
        <div>
          <label className="block text-sm text-gray-500">Username</label>
          <input
            className="inputbox"
            value={form.username}
            type="text"
            name="username"
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Gender</label>
          <select className="inputbox" value={form.gender} name="gender" onChange={onChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500">Weight</label>
          <input
            className="inputbox"
            value={form.weight}
            type="number"
            name="weight"
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Height</label>
          <input
            className="inputbox"
            value={form.height}
            type="number"
            onChange={onChange}
            name="height"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">BodyFat Percentage</label>
          <input
            className="inputbox"
            value={form.body_fat_percentage}
            type="number"
            onChange={onChange}
            name="body_fat_percentage"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Daily Calorie Budget</label>
          <input
            className="inputbox"
            value={form.calorie_budget}
            type="number"
            onChange={onChange}
            name="calorie_budget"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Target Protein</label>
          <input
            className="inputbox"
            value={form.protein_target}
            type="number"
            onChange={onChange}
            name="protein_target"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Target Fat</label>
          <input
            className="inputbox"
            value={form.fat_target}
            type="number"
            onChange={onChange}
            name="fat_target"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Target Carbs</label>
          <input
            className="inputbox"
            value={form.carbohydrate_target}
            type="number"
            onChange={onChange}
            name="carb_target"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Diet Type</label>
          <input
            className="inputbox"
            type="text"
            value={form.diet_type}
            onChange={onChange}
            name="diet_type"
          />
        </div>
        <button className="btn btn-primary">Ok</button>
      </form>
    </div>
  );
}

export default Profile;
