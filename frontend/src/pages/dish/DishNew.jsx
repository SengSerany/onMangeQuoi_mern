import DishForm from '../../components/DishForm';

function DishNew() {
  return (
    <div className="page-container">
      <div className="new-page">
        <h1>Nouveau plat</h1>
        <br />
        <DishForm />
      </div>
    </div>
  );
}

export default DishNew;
