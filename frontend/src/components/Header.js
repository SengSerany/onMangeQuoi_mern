import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user.id !== null && (
        <header
          className={location.pathname === '/profile' ? 'on-profile' : ''}
        >
          <button onClick={() => navigate(-1)}>
            <BiLeftArrowAlt className="header-icons secondary" />
          </button>
          <Link to="/profile" className="header-link-profile">
            <FaUserCircle className="header-icons primary" />
            <br />
            {user.username}
          </Link>
          <Link to="/">
            <AiOutlineHome className="header-icons secondary" />
          </Link>
        </header>
      )}
    </>
  );
}

export default Header;
