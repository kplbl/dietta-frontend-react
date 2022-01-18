import React from 'react';

const Food = ({ name, description, kcal, carb, fat, protein, id, removeFood }) => {
  const onClick = (e) => {
    e.preventDefault();
    removeFood(id);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>{kcal}</td>
      <td>{carb}</td>
      <td>{fat}</td>
      <td>{protein}</td>
      <td>
        <svg
          onClick={onClick}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 hover:text-red-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </td>
    </tr>
  );
};

export default Food;
