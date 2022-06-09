import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Profile from './pages/Profile';
import DishIndex from './pages/dish/DishIndex';
import DishShow from './pages/dish/DishShow';
import DishNew from './pages/dish/DishNew';
import DishEdit from './pages/dish/DishEdit';
import MenuIndex from './pages/menu/MenuIndex';
import MenuNew from './pages/menu/MenuNew';
import AuthToasts from './components/AuthToasts';
import DishToasts from './components/DishToasts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <AuthToasts />
          <DishToasts />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/dishes/:id/edit" element={<DishEdit />} />
            <Route exact path="/dishes/:id" element={<DishShow />} />
            <Route exact path="/dishes/new" element={<DishNew />} />
            <Route exact path="/dishes" element={<DishIndex />} />
            <Route exact path="/menus/new" element={<MenuNew />} />
            <Route exact path="/menus" element={<MenuIndex />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
