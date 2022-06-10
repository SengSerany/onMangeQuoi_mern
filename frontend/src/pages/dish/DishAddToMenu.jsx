import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddDishToMenuForm from '../../components/AddDishToMenuForm';

function DishAddToMenu() {
  const { id } = useParams();
  const { dishes } = useSelector((state) => state.dish);

  const currentDish = dishes.find((dish) => dish._id === id);

  return (
    <div className="page-container">
      <div className="flex-column">
        <h1>
          Ajouter
          <br />"{currentDish.name}"
          <br />a un menu
        </h1>
        <AddDishToMenuForm />
        <br />
      </div>
    </div>
  );
}

export default DishAddToMenu;
