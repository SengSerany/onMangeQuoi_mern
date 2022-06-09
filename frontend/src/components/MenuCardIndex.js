import { Link } from 'react-router-dom';

function MenuCardIndex({ menu }) {
  return (
    <Link to={`/menus/${menu._id}`}>
      <div className="card-index">
        <p>{menu.menuName}</p>
      </div>
    </Link>
  );
}

export default MenuCardIndex;
