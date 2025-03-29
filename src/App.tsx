import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import 'antd/dist/reset.css';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
