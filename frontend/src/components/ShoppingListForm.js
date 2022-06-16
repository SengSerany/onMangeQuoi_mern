import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  createShoppingList,
  updateShoppingList,
} from '../features/shoppingList/shoppingListSlice';

function ShoppingListForm({
  originMenu = 'none',
  currentShoppingList = 'none',
}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  let shopListID;
  if (location.pathname.endsWith('edit')) {
    shopListID = params.id;
  }
  const actionBtnLabel = () => {
    if (location.pathname.endsWith('new')) {
      return 'Créer';
    } else if (location.pathname.endsWith('edit')) {
      return 'Modifier';
    }
  };

  const initialFormData = () => {
    if (originMenu !== 'none') {
      return {
        shoppingListName: `Liste de "${originMenu.menuName}"`,
      };
    }
    if (currentShoppingList !== 'none') {
      return {
        shoppingListName: currentShoppingList.shoppingListName,
      };
    }
    return '';
  };

  const [buttonLabel] = useState(actionBtnLabel());
  const [formData, setFormData] = useState(initialFormData());
  const { shoppingListName } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname.endsWith('new')) {
      dispatch(createShoppingList(formData));
    } else if (location.pathname.endsWith('edit')) {
      const reqData = {
        ...formData,
        shoppingListId: shopListID,
      };
      dispatch(updateShoppingList(reqData));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Nom de la liste de course</label>
          <input
            type="text"
            className=""
            id="shoppingListName"
            name="shoppingListName"
            value={shoppingListName}
            placeholder="Ex: Naissance de XXX, urgent, ect."
            onChange={handleChange}
          />
        </div>
        <button type="submit">{buttonLabel}</button>
      </form>
    </div>
  );
}

export default ShoppingListForm;
