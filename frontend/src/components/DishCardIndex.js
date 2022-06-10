import { Link, useLocation } from 'react-router-dom';

function DishCardIndex({ dish = {}, forNbPeople = '?' }) {
  const location = useLocation();

  return (
    <Link to={`/dishes/${dish._id}`}>
      <div className="card-index">
        <p>{dish.name}</p>
        {location.pathname.startsWith('/menus') && <p>{forNbPeople} pers.</p>}
      </div>
    </Link>
  );
}

export default DishCardIndex;
