import React from 'react';

const Food = ({ name, description, kcal, carb, fat, protein, selected, setSelected, id }) => {
  const onClick = (e) => {
    e.preventDefault();
    setSelected(id);
  };

  return (
    <tr onClick={onClick} className={selected === id ? 'bg-gray-300' : ''}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{kcal}</td>
      <td>{carb}</td>
      <td>{fat}</td>
      <td>{protein}</td>
    </tr>
  );
};

export default Food;
