import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { deleteShoppingList } from '../../features/shoppingList/shoppingListSlice';
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

  let currentItemsList;
  if (itemsInLists) {
    currentItemsList = itemsInLists.filter(
      (itemInList) => itemInList.shoppingListID === id
    );
  }

  const initialItemsStatus = () => {
    let statusArray = [];
    if (currentItemsList) {
      currentItemsList.forEach((item) => {
        if (item.isShopped) {
        }
        statusArray.push(item.isShopped);
      });
    }
    return statusArray;
  };
  const [itemsStatus, setItemsStatus] = useState(initialItemsStatus);

  const translateUnits = (unitLabel) => {
    let unitTrad;
    switch (unitLabel) {
      case 'unity':
        unitTrad = 'unité';
        break;
      case 'soupeSpoon':
        unitTrad = 'c. à s.';
        break;
      case 'coffeeSpoon':
        unitTrad = 'c. à c.';
        break;
      case 'kilo':
        unitTrad = 'kg';
        break;
      case 'gram':
        unitTrad = 'g';
        break;
      case 'centigram':
        unitTrad = 'cg';
        break;
      case 'liter':
        unitTrad = 'litre';
        break;
      case 'centiliter':
        unitTrad = 'cl';
        break;
      default:
        unitLabel = '';
    }
    return unitTrad;
  };

  const handleItemsStatus = (event, indexComp) => {
    setItemsStatus((prevItemsStatus) => {
      return prevItemsStatus.map((state, indexInArray) => {
        if (indexInArray === indexComp) {
          return !state;
        } else {
          return state;
        }
      });
    });
  };

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
          <div className="shopping-control">
            {currentItemsList && currentItemsList.length > 0 ? (
              currentItemsList.map((currentItemInList, index) => {
                const showQuantityUnit = () => {
                  if (currentItemInList.shopItemQuantity === 0) {
                    return '';
                  } else {
                    return `${' '}(${
                      currentItemInList.shopItemQuantity +
                      ' ' +
                      translateUnits(currentItemInList.shopItemUnit)
                    })`;
                  }
                };
                return (
                  <button
                    key={currentItemInList._id}
                    type="button"
                    className={itemsStatus[index] ? 'shopped' : 'unshopped'}
                    onClick={(e) => handleItemsStatus(e, index)}
                  >{`${
                    currentItemInList.shopItemName + showQuantityUnit()
                  }`}</button>
                );
              })
            ) : (
              <div className="flex-column text-center">
                <p>Vous avez 0 produit dans cette liste de course...</p>
                <p>
                  Ajoutez des produits en{' '}
                  <strong>modifiant la liste de course</strong> ou en passant{' '}
                  <strong>par les menus</strong> ou <strong>les plats</strong>{' '}
                  directement !{' '}
                </p>
              </div>
            )}
          </div>
          <div
            className="delete-link"
            onClick={() => dispatch(deleteShoppingList(id))}
          >
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
