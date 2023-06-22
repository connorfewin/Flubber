import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import HomePage from './Pages/Home';
import NewWatchlist from './Components/NewWatchlist';
import '../src/App.css'

Amplify.configure(config);

function App() {
  return (
    <div className='root-container'>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreationZone" element={<NewWatchlist />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
