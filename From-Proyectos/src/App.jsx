import { useSelector } from 'react-redux';
import LoginPage from './pages/loginPage/login';
import './App.css';

import Dashboard from './pages/dashboard/Dashboard';

function App() {

  const { user } = useSelector((state) => state.auth);
  return (
    <div >
      {user ? (
        <Dashboard />
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;