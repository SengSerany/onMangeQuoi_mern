import DishForm from '../../components/DishForm';

function DishNew() {
  return (
    <div className="page-container">
      <div className="dish-new-page">
        <h1>Nouveau plat</h1>
        <br />
        <DishForm formLabel={'Ajouter'} />
      </div>
    </div>
  );
}

export default DishNew;
