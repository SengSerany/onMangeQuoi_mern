import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  createShoppingList,
  updateShoppingList,
} from '../features/shoppingList/shoppingListSlice';
import { FaPlusCircle } from 'react-icons/fa';

function ShoppingListForm({
  originMenu = 'none',
  currentShoppingList = 'none',
}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  const { dishesInMenu } = useSelector((state) => state.menu);
  const { dishes } = useSelector((state) => state.dish);

  let shopListID;
  if (location.pathname.endsWith('edit')) {
    shopListID = params.id;
  }

  let itemsFromMenu = [];
  if (originMenu !== 'none') {
    const dishesInThisMenu = dishesInMenu.filter(
      (link) => link.menuID === originMenu._id
    );

    itemsFromMenu = dishesInThisMenu
      .map((dishInthisMenu) => {
        const currentDish = dishes.find(
          (dish) => dish._id === dishInthisMenu.dishID
        );
        return currentDish.ingredients.map((ingredient, i) => {
          const askedQuantity =
            (ingredient.quantity / currentDish.forPeopleNumber) *
            dishInthisMenu.forNbPeople;
          const formatIngredientData = {
            shopItemType: 'food',
            shopItemName: ingredient.ingredientName,
            shopItemQuantity: askedQuantity,
            shopItemUnit: ingredient.unit,
          };
          return formatIngredientData;
        });
      })
      .flat();
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

  const itemsInitialState = {
    shopItemType: '',
    shopItemName: '',
    shopItemQuantity: '',
    shopItemUnit: '',
  };

  const [buttonLabel] = useState(actionBtnLabel());
  const [formData, setFormData] = useState(initialFormData());
  const { shoppingListName } = formData;
  const [items, setItems] = useState(
    itemsFromMenu.length > 0 ? itemsFromMenu : [itemsInitialState]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleChangeItems = (indexArg, event) => {
    const { name, value } = event.target;
    const newItemsData = items.map((item, indexElement) => {
      if (indexElement === indexArg) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });
    setItems(newItemsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname.endsWith('new')) {
      const reqData = {
        ...formData,
        items: items,
      };
      dispatch(createShoppingList(reqData));
    } else if (location.pathname.endsWith('edit')) {
      const reqData = {
        ...formData,
        shoppingListId: shopListID,
      };
      dispatch(updateShoppingList(reqData));
    }
  };

  const handleAddItems = () => {
    setItems((prevItems) => {
      return [...prevItems, itemsInitialState];
    });
  };

  const log = () => {
    console.log(itemsFromMenu);
  };

  return (
    <div>
      <button onClick={log}>LOG</button>
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
        <div className="form-control">
          <label className="ingredients-label">Produits</label>
          {items.map((itemsInput, index) => {
            return (
              <div
                className="form-control ingredient"
                key={`name-${index}-item`}
              >
                <label>{`Produit ${index + 1}`}</label>
                <select
                  type="text"
                  className=""
                  name="shopItemType"
                  placeholder="Type"
                  value={itemsInput.shopItemType}
                  onChange={(event) => handleChangeItems(index, event)}
                >
                  <option className="text-grey">
                    Quel type de produit est-ce ?
                  </option>
                  <option value="food">Alimentaire</option>
                  <option value="not food">Non alimentaire</option>
                </select>
                <input
                  type="text"
                  className=""
                  name="shopItemName"
                  value={itemsInput.shopItemName}
                  placeholder="Nom du produit"
                  onChange={(event) => handleChangeItems(index, event)}
                />
                <input
                  type="number"
                  min="0"
                  className=""
                  name="shopItemQuantity"
                  value={itemsInput.shopItemQuantity}
                  placeholder="Quantité"
                  onChange={(event) => handleChangeItems(index, event)}
                />
                <select
                  type="text"
                  className=""
                  name="shopItemUnit"
                  placeholder="Unité"
                  value={itemsInput.shopItemUnit}
                  onChange={(event) => handleChangeItems(index, event)}
                >
                  <option className="text-grey choose">
                    Choisissez une unité de mesure
                  </option>
                  <option value="unity">Unité</option>
                  <option value="soupeSpoon">Cuillère à soupe</option>
                  <option value="coffeeSpoon">Cuillère à café</option>
                  <option value="kilo">Kilogramme</option>
                  <option value="gram">Gramme</option>
                  <option value="centigram">Centigramme</option>
                  <option value="liter">Litre</option>
                  <option value="centiliter">Centilitre</option>
                </select>
              </div>
            );
          })}
          <div className="add-ingredients-button" onClick={handleAddItems}>
            <p>Ajouter un produit</p>
            <em>
              <FaPlusCircle />
            </em>
          </div>
        </div>
        <button type="submit">{buttonLabel}</button>
      </form>
      <br />
      <br />
      <br />
    </div>
  );
}

export default ShoppingListForm;
