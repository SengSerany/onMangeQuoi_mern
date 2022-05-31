import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLeftArrowAlt } from 'react-icons/bi';

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <button onClick={() => navigate(-1)}>
        <BiLeftArrowAlt className="header-icons secondary" />
      </button>
      <Link to="/profile" className="header-link-profile">
        <FaUserCircle className="header-icons primary" />
        <br />
        Username
      </Link>
      <Link to="/">
        <AiOutlineHome className="header-icons secondary" />
      </Link>
    </header>
  );
}

export default Header;
