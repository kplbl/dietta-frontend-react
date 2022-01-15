const Entry = ({ food, amount, selectedRow, setSelectedRow, id }) => {
  const onClick = (e) => {
    e.preventDefault();
    setSelectedRow(id);
  };

  return (
    <tr onClick={onClick} className={selectedRow === id ? 'bg-gray-300' : ''}>
      <td>{food}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default Entry;
