import { useLocation, Link } from 'react-router-dom';

function AuthRedirectButton() {
  const location = useLocation();
  return (
    <Link to={location.pathname === '/login' ? '/register' : '/login'}>
      <button className="auth-redirect-button">
        {location.pathname === '/login'
          ? "Je n'ai pas encore de compte"
          : "J'ai déja un compte"}
      </button>
    </Link>
  );
}

export default AuthRedirectButton;
