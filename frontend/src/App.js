import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';
import HomePage from './Pages/Home';
import NewWatchlist from './Components/NewWatchlist';

Amplify.configure(config);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-watchlist" element={<NewWatchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
