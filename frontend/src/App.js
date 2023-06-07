import './App.css';
import NewPortfolio from './Components/NewPortfolio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
