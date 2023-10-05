import './App.css'
import PrivateRoute from './routes/PrivateRoute'
import Login from './pages/Login/Login'
import UserList from './pages/UserList/UserList'
import { Navigate, Route, Routes } from 'react-router-dom'
import UserInfo from './pages/UserInfo/UserInfo'
import Dashboard from './pages/Dashboard/Dashboard'
import Analytics from './pages/Analytics/Analytics'
import Users from './pages/Users/Users'
import ManageAdmins from './pages/ManageAdmins/ManageAdmins'
import SendLetter from './pages/SendLetter/SendLetter'
import PromoCodeList from './pages/PromoCodeList/PromoCodeList'
import ListOfPayments from './pages/ListOfPayments/ListOfPayments'
import VipPricing from './pages/VipPricing/VipPricing'
import Settings from './pages/Settings/Settings'
import AddCollector from './pages/AddCollector/AddCollector'
import AddArtist from './pages/AddArtist/AddArtist'
import AddGallery from './pages/AddGallery/AddGallery'
import AddUser from './pages/AddUser/AddUser'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/clients/add" element={<AddUser />
        } />
        <Route path="/clients/collector" element={<AddCollector />
        } />
        <Route path="/clients/gallery" element={<AddGallery />
        } />
        <Route path="/clients/artist" element={<AddArtist />
        } />


        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/clients" element={<UserList />
          } />

          <Route path="/clients/:id" element={<UserInfo />
          } />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admins" element={<ManageAdmins />} />
          <Route path="/letter" element={<SendLetter />} />
          <Route path="/promo" element={<PromoCodeList />} />
          <Route path="/payments" element={<ListOfPayments />} />
          <Route path="/vip" element={<VipPricing />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to={'/login'} />} />


      </Routes>
    </div>
  )
}

export default App
