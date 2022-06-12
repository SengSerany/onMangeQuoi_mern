import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { createMenu, updateMenu } from '../features/menu/menuSlice';

function MenuForm({ currentMenu = { menuName: '', dishesInMenu: [] } }) {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { dishes } = useSelector((state) => state.dish);

  const actionBtnLabel = () => {
    if (location.pathname.endsWith('new')) {
      return 'Créer';
    } else if (location.pathname.endsWith('edit')) {
      return 'Modifier';
    }
  };

  const initialCheckedValue = () => {
    if (location.pathname.endsWith('new')) {
      return dishes.map((dish) => {
        return {
          nameDish: dish.name,
          IDDish: dish._id,
          isCheck: false,
        };
      });
    }
  };

  const [buttonLabel] = useState(actionBtnLabel());
  const [isChecked, setIsChecked] = useState(initialCheckedValue());
  const [formData, setFormData] = useState(currentMenu);
  const { menuName } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleChangeCheckbox = (position, e) => {
    const { name, value } = e.target;
    const updatedCheckedState = isChecked.map((item, index) => {
      if (index === position) {
        return {
          ...item,
          isCheck: !item.isCheck,
        };
      } else {
        return item;
      }
    });
    setIsChecked(updatedCheckedState);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname.endsWith('new')) {
      let addedDishesID = [];
      for (let i = 0; i < isChecked.length; i++) {
        if (isChecked[i].isCheck) {
          console.log({ [i]: isChecked[i].isCheck });
          addedDishesID.push(isChecked[i].IDDish);
        }
      }
      const reqFormData = {
        ...formData,
        addedDishesID,
      };
      dispatch(createMenu(reqFormData));
    } else if (location.pathname.endsWith('edit')) {
      const reqFormData = {
        ...formData,
        menuId: id,
      };
      dispatch(updateMenu(reqFormData));
    }
  };

  const log = () => {
    console.log(isChecked);
  };
  return (
    <form onSubmit={handleSubmit}>
      <button onClick={log}>LOG</button>
      <div className="form-control">
        <label>Nom du menu</label>
        <input
          type="text"
          className=""
          id="menuName"
          name="menuName"
          value={menuName}
          placeholder="Ex: Noël, Semaine 12, ect."
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label className="box-label-checkbox">
          Ajouter des plats dans le menu ?
        </label>
        {dishes.map((dish, index) => {
          return (
            <div className="component-checkbox">
              <input
                key={dish._id}
                type="checkbox"
                className="card-index"
                id={dish._id}
                // value={menuName}
                checked={isChecked[index].isCheck}
                onChange={(e) => handleChangeCheckbox(index, e)}
              />
              <label className="component-label-checkbox">{dish.name}</label>
            </div>
          );
        })}
      </div>
      <br />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default MenuForm;
