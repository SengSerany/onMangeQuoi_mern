import DishForm from '../../components/DishForm';
import DishToasts from '../../components/DishToasts.js';

function DishNew() {
  return (
    <div className="page-container">
      <DishToasts />
      <div className="dish-new-page">
        <h1>Nouveau plat</h1>
        <br />
        <DishForm formLabel={'Ajouter'} />
      </div>
    </div>
  );
}

export default DishNew;
