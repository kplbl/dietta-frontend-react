import UserContext from '../../context/user/UserContext';
import { useContext } from 'react';

function Targets() {
  const { user } = useContext(UserContext);

  const calories = 120;
  const calories_limit = user.calorie_budget;
  const calories_value = 60;

  const protein = 120;
  const protein_limit = user.protein_target;
  const protein_value = 80;

  const carb = 120;
  const carb_limit = user.carbohydrate_target;
  const carb_value = 50;

  const fats = 120;
  const fats_limit = user.fat_target;
  const fats_value = 40;

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-5">
        <div className="w-36">Kalorije</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div className="bg-blue-600 h-5 rounded" style={{ width: `${calories_value}` + '%' }}>
            {calories.toFixed(1)} / {calories_limit} kcal
          </div>
        </div>
      </div>

      <div className="flex gap-x-5">
        <div className="w-36">Beljakovine</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div className="bg-red-600 h-5 rounded" style={{ width: `${protein_value}` + '%' }}>
            {protein.toFixed(1)} / {protein_limit} g
          </div>
        </div>
      </div>
      <div className="flex gap-x-5">
        <div className="w-36">Hidrati</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div className="bg-yellow-600 h-5 rounded" style={{ width: `${carb_value}` + '%' }}>
            {carb.toFixed(2)} / {carb_limit} g
          </div>
        </div>
      </div>
      <div className="flex gap-x-5">
        <div className="w-36">Maščobe</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div className="bg-green-600 h-5 rounded" style={{ width: `${fats_value}` + '%' }}>
            {fats.toFixed(2)} / {fats_limit}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Targets;
