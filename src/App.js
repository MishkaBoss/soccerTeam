// import './assets/global.scss'
import { HashRouter as Router, Navigate, Route, Routes, Switch } from 'react-router-dom'
import { SoccerTeamApp } from './pages/SoccerTeamApp'
import { AppNav } from './components/AppNav'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { CreateGamePage } from './pages/CreateGamePage'
import { GameDetailsPage } from './pages/GameDetailsPage'
import { NotAnAdmin } from './components/NotAnAdmin'

const PrivateRoute = ({ children }) => {
  const isAdmin = false
  return isAdmin ? children : <Navigate to='/accessDenied' />
}


function App() {

  return (
    <Router>
      <div className=''>
        <main className=''>
          <Routes>
            <Route path='/newGame' element={
              < PrivateRoute>
                < CreateGamePage />
              </PrivateRoute>
            } />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard' element={<SoccerTeamApp />} />
            <Route path='/dashboard/:id' element={<GameDetailsPage />} />
            <Route path='/' element={<LoginPage />} />
            <Route path='/accessDenied' element={<NotAnAdmin />} />
          </Routes>
        </main>
        {/* <AppNav></AppNav> */}
      </div>
    </Router>
  )
}

export default App
