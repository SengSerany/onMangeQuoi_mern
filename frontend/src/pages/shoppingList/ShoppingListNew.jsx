import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ShoppingListForm from '../../components/ShoppingListForm';

function ShoppingListNew() {
  const location = useLocation();
  const { menus } = useSelector((state) => state.menu);
  let originMenuID;
  let originMenu;
  if (location.state && location.state.menu) {
    originMenuID = location.state.menu;
    originMenu = menus.find((menu) => menu._id === originMenuID);
  }

  return (
    <div className="page-container">
      <div className="flex-column">
        {originMenuID ? (
          <h1>Créer la liste de course du menu "{originMenu.menuName}"</h1>
        ) : (
          <h1>Créer une liste de course</h1>
        )}
        <br />
        <ShoppingListForm originMenu={originMenu} />
      </div>
    </div>
  );
}

export default ShoppingListNew;
