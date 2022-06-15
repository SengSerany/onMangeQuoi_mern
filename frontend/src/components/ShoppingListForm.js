import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createShoppingList } from '../features/shoppingList/shoppingListSlice';

function ShoppingListForm({ originMenu = 'none' }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const actionBtnLabel = () => {
    if (location.pathname.endsWith('new')) {
      return 'Créer';
    } else if (location.pathname.endsWith('edit')) {
      return 'Modifier';
    }
  };

  const initialFormData = {
    shoppingListName:
      originMenu !== 'none' ? `Liste de "${originMenu.menuName}"` : '',
  };

  const [buttonLabel] = useState(actionBtnLabel());
  const [formData, setFormData] = useState(initialFormData);
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
    dispatch(createShoppingList(formData));
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
