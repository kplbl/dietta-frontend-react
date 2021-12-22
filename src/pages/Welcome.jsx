import useLocalStorage from '../hooks/useLocalStorage';

function Welcome() {
  const [token, setToken] = useLocalStorage('token', '');

  return (
    <div>
      <div>token: {token}</div>
      <div>
        <button onClick={() => setToken('test1')} className="px-4 py-2 rounded-md bg-slate-500">
          test
        </button>
      </div>
    </div>
  );
}

export default Welcome;
