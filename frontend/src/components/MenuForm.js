import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { createMenu, updateMenu } from '../features/menu/menuSlice';

function MenuForm({ currentMenu = { menuName: '', dishesInMenu: [] } }) {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { dishes } = useSelector((state) => state.dish);
  const { dishesInMenu } = useSelector((state) => state.menu);

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
          forNbPeople: 1,
          isCheck: false,
        };
      });
    } else if (location.pathname.endsWith('edit')) {
      const checkedDishes = dishesInMenu.filter((dish) => dish.menuID === id);
      return dishes.map((dish) => {
        if (checkedDishes.some((checkDish) => checkDish.dishID === dish._id)) {
          const currentDishMenuLink = checkedDishes.find(
            (dishInThisMenu) => dishInThisMenu.dishID === dish._id
          );
          return {
            nameDish: dish.name,
            IDDish: dish._id,
            forNbPeople: currentDishMenuLink.forNbPeople,
            isCheck: true,
          };
        } else {
          return {
            nameDish: dish.name,
            IDDish: dish._id,
            forNbPeople: 1,
            isCheck: false,
          };
        }
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
    const { value, type } = e.target;

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

    if (type === 'checkbox') {
      setIsChecked(updatedCheckedState);
    }

    const updatedNbPeoplevalue = isChecked.map((item, index) => {
      if (index === position) {
        return {
          ...item,
          forNbPeople: value,
        };
      } else {
        return item;
      }
    });

    if (type === 'number') {
      setIsChecked(updatedNbPeoplevalue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let addedDishesID = [];
    let addedDishesPeopleNb = [];
    for (let i = 0; i < isChecked.length; i++) {
      if (isChecked[i].isCheck) {
        addedDishesID.push(isChecked[i].IDDish);
        addedDishesPeopleNb.push(isChecked[i].forNbPeople);
      }
    }
    if (location.pathname.endsWith('new')) {
      const reqFormData = {
        ...formData,
        addedDishesID,
        addedDishesPeopleNb,
      };
      dispatch(createMenu(reqFormData));
      console.log(reqFormData);
    } else if (location.pathname.endsWith('edit')) {
      const reqFormData = {
        ...formData,
        menuId: id,
        addedDishesID,
        addedDishesPeopleNb,
      };
      dispatch(updateMenu(reqFormData));
    }
  };

  const log = () => {
    console.log(isChecked);
  };
  return (
    <>
      <button onClick={log}>LOG</button>
      <form onSubmit={handleSubmit}>
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
            {location.pathname.endsWith('new') ? 'Ajouter d' : 'Modifier l'}es
            plats dans le menu ?
          </label>
          {dishes.map((dish, index) => {
            return (
              <div key={dish._id}>
                <div className="component-checkbox">
                  <input
                    type="checkbox"
                    className="card-index"
                    id={`dish-${dish._id}`}
                    value={menuName}
                    checked={isChecked[index].isCheck}
                    onChange={(e) => handleChangeCheckbox(index, e)}
                  />
                  <label className="component-label-checkbox">
                    {dish.name}
                  </label>
                </div>
                {isChecked[index].isCheck && (
                  <div className="menuForm-NbPeople">
                    <label>Pour combien de personne ?</label>
                    <input
                      type="number"
                      min="1"
                      className=""
                      id={`forNbPeople-${dish._id}`}
                      value={isChecked[index].forNbPeople}
                      checked={isChecked[index].isCheck}
                      placeholder="Pour cb personne ?"
                      onChange={(e) => handleChangeCheckbox(index, e)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <br />
        <button type="submit">{buttonLabel}</button>
      </form>
    </>
  );
}

export default MenuForm;
