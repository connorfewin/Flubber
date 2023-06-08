import './App.css';
import NewGoal from './Components/NewGoal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewGoal />} />
      </Routes>
    </Router>
  );
}

export default App;
