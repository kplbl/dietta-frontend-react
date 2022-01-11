import useLocalStorage from '../hooks/useLocalStorage';

function Welcome() {
  const [token, setToken] = useLocalStorage('token', '');

  return (
    <div>
      <div>token: {token}</div>
      <div></div>
    </div>
  );
}

export default Welcome;
