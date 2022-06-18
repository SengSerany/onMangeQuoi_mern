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
  const { itemsInLists } = useSelector((state) => state.shoppingList);

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
  } else if (location.pathname.endsWith('edit')) {
    itemsFromMenu = itemsInLists.filter(
      (itemInThisList) => itemInThisList.shoppingListID === params.id
    );
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

  const formatEntries = (string) => {
    const lowerString = string.toLowerCase();
    return lowerString.charAt(0).toUpperCase() + lowerString.slice(1);
  };

  const handleChangeItems = (indexArg, event) => {
    const { name, value } = event.target;
    const newItemsData = items.map((item, indexElement) => {
      if (indexElement === indexArg) {
        if (name === 'shopItemName') {
          return { ...item, shopItemName: formatEntries(value) };
        } else {
          return { ...item, [name]: value };
        }
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
        items: items,
      };
      dispatch(updateShoppingList(reqData));
    }
  };

  const handleAddItems = () => {
    setItems((prevItems) => {
      return [...prevItems, itemsInitialState];
    });
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
                  required
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
                  required
                  type="text"
                  className=""
                  name="shopItemName"
                  value={itemsInput.shopItemName}
                  placeholder="Nom du produit"
                  onChange={(event) => handleChangeItems(index, event)}
                />
                <input
                  required
                  type="number"
                  min="0"
                  step=".01"
                  className=""
                  name="shopItemQuantity"
                  value={itemsInput.shopItemQuantity}
                  placeholder="Quantité"
                  onChange={(event) => handleChangeItems(index, event)}
                />
                <label className="choose">Choisissez une unité de mesure</label>
                <select
                  required
                  type="text"
                  className=""
                  name="shopItemUnit"
                  placeholder="Unité"
                  value={itemsInput.shopItemUnit}
                  onChange={(event) => handleChangeItems(index, event)}
                >
                  <option value="none">Aucune</option>
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
