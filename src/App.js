import './assets/global.scss'
import { HashRouter as Router, Navigate, Route, Routes, Switch } from 'react-router-dom'
import { SoccerTeamApp } from './pages/SoccerTeamApp'
import { AppNav } from './components/AppNav'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { CreateGamePage } from './pages/CreateGamePage'
import { GameDetailsPage } from './pages/GameDetailsPage'


function App() {

  return (
    <Router>
      <div className='main-app'>
        <main className='container'>
          <Routes>
            <Route path='/newGame' element={<CreateGamePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard' element={<SoccerTeamApp />} />
            <Route path='/dashboard/:id' element={<GameDetailsPage />} />
            <Route path='/' element={<LoginPage />} />
          </Routes>
        </main>
        {/* <AppNav></AppNav> */}
      </div>
    </Router>
  )
}

export default App
