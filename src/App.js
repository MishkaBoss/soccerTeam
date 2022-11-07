import './App.css';
import { HashRouter as Router, Navigate, Route, Routes, Switch } from 'react-router-dom';
import { SoccerTeamApp } from './pages/SoccerTeamApp';

function App() {
  return (
    <div className="App">
      <SoccerTeamApp />
      {/* <Router>
        <Route path='/' element={<SoccerTeamApp></SoccerTeamApp>} />
      </Router> */}
    </div>
  );
}

export default App;
