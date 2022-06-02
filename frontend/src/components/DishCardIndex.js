import { Link } from 'react-router-dom';

function DishCardIndex({ dish }) {
  return (
    <Link to={`/dishes/${dish._id}`}>
      <div className="dish-card-index">
        <p>{dish.name}</p>
      </div>
    </Link>
  );
}

export default DishCardIndex;
