import UserContext from '../../context/user/UserContext';
import { useContext } from 'react';

function Targets({ entries }) {
  const { user } = useContext(UserContext);

  const { calorie_budget, protein_target, fat_target, carbohydrate_target } = user;

  const calc_calories = (entries) => {
    let x = entries.reduce((a, b) => {
      return a + b.amount * b.food.kcal;
    }, 0);
    return (x * 0.01).toFixed(2);
  };

  const calc_protein = (entries) => {
    let x = entries.reduce((a, b) => {
      return a + b.amount * b.food.protein;
    }, 0);
    return (x * 0.01).toFixed(2);
  };

  const calc_carb = (entries) => {
    let x = entries.reduce((a, b) => {
      return a + b.amount * b.food.carb;
    }, 0);
    return (x * 0.01).toFixed(2);
  };

  const calc_fats = (entries) => {
    let x = entries.reduce((a, b) => {
      return a + b.amount * b.food.fat;
    }, 0);
    return (x * 0.01).toFixed(2);
  };

  const calc_percentage = (a, b) => {
    const p = (a / b) * 100;
    if (p < 100) {
      return p;
    } else {
      return 100;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-x-5">
        <div className="w-36">Kalorije</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div
            className="bg-blue-600 h-5 rounded"
            style={{ width: `${(calc_calories(entries) * 100) / calorie_budget}` + '%' }}
          >
            {calc_calories(entries)} / {calorie_budget} kcal
          </div>
        </div>
      </div>

      <div className="flex gap-x-5">
        <div className="w-36">Beljakovine</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div
            className="bg-red-600 h-5 rounded"
            style={{ width: `${calc_percentage(calc_protein(entries), protein_target)}` + '%' }}
          >
            {calc_protein(entries)} / {protein_target} g
          </div>
        </div>
      </div>
      <div className="flex gap-x-5">
        <div className="w-36">Hidrati</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div
            className="bg-yellow-600 h-5 rounded"
            style={{ width: `${calc_percentage(calc_carb(entries), carbohydrate_target)}` + '%' }}
          >
            {calc_carb(entries)} / {carbohydrate_target} g
          </div>
        </div>
      </div>
      <div className="flex gap-x-5">
        <div className="w-36">Maščobe</div>
        <div className="w-full bg-gray-200 rounded h-5 dark:bg-gray-700 mr-5">
          <div
            className="bg-green-600 h-5 rounded"
            style={{ width: `${calc_percentage(calc_fats(entries), fat_target)}` + '%' }}
          >
            {calc_fats(entries)} / {fat_target} g
          </div>
        </div>
      </div>
    </div>
  );
}

export default Targets;
