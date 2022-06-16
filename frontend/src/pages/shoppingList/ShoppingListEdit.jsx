import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShoppingListForm from '../../components/ShoppingListForm';

function ShoppingListEdit() {
  const { id } = useParams();
  const { shoppingLists } = useSelector((state) => state.shoppingList);
  const currentShoppingList = shoppingLists.find(
    (shopList) => shopList._id === id
  );
  return (
    <div className="page-container">
      <div className="flex-column justify-center">
        <h1>
          Modifier la liste
          <em>
            <br />"{currentShoppingList.shoppingListName}"
          </em>
        </h1>
        <br />
        <ShoppingListForm currentShoppingList={currentShoppingList} />
      </div>
    </div>
  );
}

export default ShoppingListEdit;
