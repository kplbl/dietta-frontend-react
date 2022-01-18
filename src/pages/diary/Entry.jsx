const Entry = ({ food, amount, kcal, selectedRow, setSelectedRow, id }) => {
  const onClick = (e) => {
    e.preventDefault();
    setSelectedRow(id);
  };

  return (
    <tr onClick={onClick} className={selectedRow === id ? 'bg-gray-300' : ''}>
      <td>{food}</td>
      <td>{amount}</td>
      <td>g</td>
      <td>{(kcal * amount) / 100}</td>
    </tr>
  );
};

export default Entry;
