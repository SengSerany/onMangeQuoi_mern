import MenuForm from '../../components/MenuForm';

function MenuNew() {
  return (
    <div className="page-container">
      <div className="flex-column">
        <h1>Nouveau Menu</h1>
        <br />
        <MenuForm />
      </div>
    </div>
  );
}

export default MenuNew;
