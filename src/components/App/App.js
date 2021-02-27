import { useRoutes, navigate } from 'hookrouter';
import routes from '../../utils/routes'; 
import './App.css';

function App() {
  const token = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if(!token || !refreshToken) {
    navigate('/login');
  }
  const routeResult = useRoutes(routes);
  return routeResult;
}

export default App;
