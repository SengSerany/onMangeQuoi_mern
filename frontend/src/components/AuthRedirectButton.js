import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { logoutShoppingListState } from '../features/shoppingList/shoppingListSlice';
import { logoutMenuState } from '../features/menu/menuSlice';
import { logoutDishState } from '../features/dish/dishSlice';

function AuthRedirectButton({ use = 'switch' }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  if (use === 'logout') {
    return (
      <button
        className="btn-profile btn-disconnect"
        onClick={() => {
          dispatch(logout());
          dispatch(logoutShoppingListState());
          dispatch(logoutMenuState());
          dispatch(logoutDishState());
        }}
      >
        Se déconnecter
      </button>
    );
  }

  const btnLink = () => {
    if (location.pathname === '/login') {
      return '/register';
    } else if (location.pathname === '/register') {
      return '/login';
    } else if (location.pathname === '/profile') {
      return `/profile/${user.id}/edit`;
    }
  };

  const laberLink = () => {
    if (location.pathname === '/login') {
      return "Je n'ai pas encore de compte";
    } else if (location.pathname === '/register') {
      return "J'ai déja un compte";
    } else if (location.pathname === '/profile') {
      if (use === 'edit') {
        return 'Modifier mes identifiants';
      }
    }
  };

  const classLink = () => {
    if (use === 'edit') {
      return 'btn-profile bg-yellow';
    } else if (use === 'logout') {
      return 'btn-profile bg-black';
    }
  };

  return (
    <Link to={btnLink()} className={classLink()}>
      <button className="auth-redirect-button">{laberLink()}</button>
    </Link>
  );
}

export default AuthRedirectButton;
