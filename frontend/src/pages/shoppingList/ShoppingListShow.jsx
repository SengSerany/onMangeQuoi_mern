import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { deleteMenu } from '../../features/menu/menuSlice';
import FixedActionButton from '../../components/FixedActionButton';

function ShoppingListShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { shoppingLists, itemsInLists, shoppingListLoading } = useSelector(
    (state) => state.shoppingList
  );
  const currentShoppingList = shoppingLists.find(
    (shoppingList) => shoppingList._id === id
  )
    ? shoppingLists.find((shoppingList) => shoppingList._id === id)
    : {};

  if (shoppingListLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="page-container">
        <div className="flex-column">
          <p className="color-grey1 no-margin text-center">liste de course :</p>
          <h1>{currentShoppingList.shoppingListName}</h1>
          <br />
          {}
          <div className="delete-link" onClick={() => dispatch(deleteMenu(id))}>
            <p>Supprimer le menu</p>
          </div>
          <div className="space-behind-fixed-button"></div>
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'editShoppingList',
            roleDescription: 'Modifier la liste de course',
            css: 'edit',
            currentID: currentShoppingList._id,
          },
        ]}
      />
    </div>
  );
}

export default ShoppingListShow;
