import './App.css'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/Login/Login'
import UserList from './pages/UserList/UserList'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UserList />
          } />
        </Route>

      </Routes>
    </div>
  )
}

export default App
