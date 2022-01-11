const Entry = ({ food, amount, selected, setSelected, id }) => {
  const onClick = (e) => {
    e.preventDefault();
    setSelected(id);
  };

  return (
    <tr onClick={onClick} className={selected === id ? 'bg-gray-300' : ''}>
      <td>{food}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default Entry;
