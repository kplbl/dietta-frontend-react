import Entry from './Entry';

function Entries({ entries, selectedRow, setSelectedRow }) {
  console.log('test', entries);
  return (
    <table className="w-full md:w-1/2 table-auto">
      <thead>
        <tr>
          <th className="text-left">Food</th>
          <th className="text-left">Amount</th>
          <th className="text-left">Unit</th>
          <th className="text-left">kCal</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <Entry
            key={entry._id}
            food={entry.food.name}
            kcal={entry.food.kcal}
            amount={entry.amount}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            id={entry._id}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Entries;
