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
import DishAddToMenu from './pages/dish/DishAddToMenu';
import MenuIndex from './pages/menu/MenuIndex';
import MenuNew from './pages/menu/MenuNew';
import MenuShow from './pages/menu/MenuShow';
import MenuEdit from './pages/menu/MenuEdit';
import ShoppingListIndex from './pages/shoppingList/ShoppingListIndex';
import ShoppingListShow from './pages/shoppingList/ShoppingListShow';
import ShoppingListNew from './pages/shoppingList/ShoppingListNew';
import ShoppingListEdit from './pages/shoppingList/ShoppingListEdit';
import AuthToasts from './components/AuthToasts';
import DishToasts from './components/DishToasts';
import MenuToasts from './components/MenuToasts';
import ShoppingListToasts from './components/ShoppingListsToasts';
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
          <MenuToasts />
          <ShoppingListToasts />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/dishes/:id/add" element={<DishAddToMenu />} />
            <Route exact path="/dishes/:id/edit" element={<DishEdit />} />
            <Route exact path="/dishes/:id" element={<DishShow />} />
            <Route exact path="/dishes/new" element={<DishNew />} />
            <Route exact path="/dishes" element={<DishIndex />} />
            <Route exact path="/menus/:id/edit" element={<MenuEdit />} />
            <Route exact path="/menus/:id" element={<MenuShow />} />
            <Route exact path="/menus/new" element={<MenuNew />} />
            <Route exact path="/menus" element={<MenuIndex />} />
            <Route
              exact
              path="/shopping-list/:id/edit"
              element={<ShoppingListEdit />}
            />
            <Route
              exact
              path="/shopping-list/:id"
              element={<ShoppingListShow />}
            />
            <Route
              exact
              path="/shopping-list/new"
              element={<ShoppingListNew />}
            />
            <Route
              exact
              path="/shopping-list"
              element={<ShoppingListIndex />}
            />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
