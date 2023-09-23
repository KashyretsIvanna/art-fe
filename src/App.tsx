import './App.css'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/Login/Login'
import UserList from './pages/UserList/UserList'
import { Route, Routes } from 'react-router-dom'
import UserInfo from './pages/UserInfo/UserInfo'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/users" element={<UserList />
          } />
          <Route path="/users/:id" element={<UserInfo />
          } />
        </Route>

      </Routes>
    </div>
  )
}

export default App
