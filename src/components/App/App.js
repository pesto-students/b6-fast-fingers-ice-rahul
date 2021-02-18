import { useRoutes } from 'hookrouter';
import routes from '../../utils/routes'; 
import './App.css';

function App() {
  const routeResult = useRoutes(routes);
  return routeResult;
}

export default App;
