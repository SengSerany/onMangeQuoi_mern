import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DishForm from '../../components/DishForm';
import Spinner from '../../components/Spinner';

function DishEdit() {
  const { id } = useParams();
  const { dishes, dishLoading } = useSelector((state) => state.dish);

  let currentDish = dishes.find((dish) => dish._id === id);

  if (dishLoading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      <div className="dish-new-page">
        <h1>
          Modifier
          <em>
            <br />"{currentDish.name}"
          </em>
        </h1>
        <br />
        <DishForm currentDish={currentDish} />
      </div>
    </div>
  );
}

export default DishEdit;
