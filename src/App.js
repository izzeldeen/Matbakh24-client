import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import React from 'react';
import './App.css';
import {isMobile} from 'react-device-detect';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Orders from './Pages/Orders';
import Accouns from './Pages/Accounts';
import Drivers from './Pages/Drivers';
import Transactions from './Pages/Transactions';
import Login from './Pages/Login';
import Providers from './Pages/Providers';
import Foods from './Pages/Foods';
import RegisterDriver from './Pages/RegisterDriver';
import SuccessPage from './Pages/success';
import RegisterProvider from './Pages/RegisterProvider';
import AddAdmin from './Pages/AddAdmin';
import Admins from './Pages/Admins';
import ProviderDetails from './Pages/ProvideerDetails';
import DriverDetails from './Pages/DriverDetails';
import OrderDetail from './Pages/OrderDetail';
import Support from './Pages/Support/Support';
import Roles from './Pages/Roles';
import hasRole from './Functions';
import TabsView from './Components/TabsView';
import FoodDetail from './Pages/FoodDetail';
import FoodList from './Pages/FoodList';
import EditFood from './Pages/EditFood';
import MobileHome from './Pages/MobileHome';
import NotPermited from './Pages/NotPermited';
import Settings from './Pages/Settings';
import ContactUs from './Pages/ContactUs';
import CusinePage from './Pages/CusinePage';
import CusineMeals from './Pages/CusineMeals';
import MailsList from './Pages/MailsList';
import TransactionDetails from './Pages/TransactionDetails';

function App() {
  // window.baseurl = "http://localhost:5009/"
   //window.baseurl = "https://webapi.matbakh24.com/"
    window.baseurl = "https://localhost:44308/"
   //window.baseurl = "https://webapi.matbakh24.com/"
 // window.baseurl = "https://dev.webapi.matbakh24.com/"
  return (
    <Router basename="/">
    <Routes >
      <Route path="/" element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="driver/signup" element={<RegisterDriver />} />
      <Route path="cusine/signup" element={<RegisterProvider />} />
      <Route path="success" element={<SuccessPage />} />
      <Route path="support" element={hasRole("support")?<Support />:<Login error={true}/>} />

       {/* outlet */}
      <Route path="admin"  element={<Dashboard />}>
      <Route path="" element={hasRole("home")?isMobile?<MobileHome/>:<Home />:<Login error={true}/>} />
      <Route path="home" element={hasRole("home")?isMobile?<MobileHome/>:<Home />:<Login error={true}/>} />
      <Route path="orders" element={hasRole("orders")?<Orders/>:<NotPermited error={true}/>} />
      <Route path="order/detail" element={<OrderDetail/>} />
      <Route path="accounts" element={hasRole("accounts")?<Accouns />:<Login error={true}/>} />
      <Route path="roles" element={hasRole("roles")?<Roles />:<Login error={true}/>} />
      <Route path="providers" element={hasRole("providers")?<Providers />:<Login error={true}/>} />
      <Route path="provider/detail" element={<CusinePage />} />
      <Route path="provider/meals" element={<MailsList />} />
      {/* <Route path="provider/meals" element={<CusineMeals />} /> */}
      <Route path="driver/detail" element={<DriverDetails />} />
      <Route path="drivers" element={hasRole("drivers")?<Drivers />:<Login error={true}/>} />
      <Route path="admins/add" element={hasRole("add-manager")?<AddAdmin />:<Login error={true}/>} />
      <Route path="admins" element={hasRole("managers")?<Admins />:<Login error={true}/>} />
      <Route path="transactions" element={hasRole("transactions")?<Transactions />:<Login error={true}/>} />
      <Route path="transaction/detail" element={<TransactionDetails/>} />
      <Route path="foods" element={hasRole("foods")?<Foods />:<Login error={true}/>} />
      <Route path="foods/detail" element={hasRole("foods")?<FoodDetail />:<Login error={true}/>} />
      <Route path="Cooking/List" element={hasRole("foods")?<FoodList />:<Login error={true}/>} />
      <Route path="foods/edit" element={hasRole("foods")?<EditFood />:<Login error={true}/>} />
      <Route path="reports" element={hasRole("reports")?<TabsView />:<Login error={true}/>} />
      <Route path="settings" element={<Settings/>} />
      <Route path="contact" element={<ContactUs/>} />
      </Route>
    </Routes>
  </Router>
  
  );
}

export default App;


