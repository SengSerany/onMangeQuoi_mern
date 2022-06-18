import { useSelector } from 'react-redux';
import InfosCharge from '../../components/InfosCharge';
import ShoppingListCardIndex from '../../components/ShoppingListCardIndex';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function ShoppingListIndex() {
  const { dishLoading } = useSelector((state) => state.dish);
  const { menuLoading } = useSelector((state) => state.menu);
  const { shoppingLists, shoppingListLoading } = useSelector(
    (state) => state.shoppingList
  );

  if (dishLoading) {
    return <Spinner />;
  }

  if (menuLoading) {
    return <Spinner />;
  }

  if (shoppingListLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <InfosCharge />
      <div className="page-container">
        <div className="flex-column">
          <h1>Mes listes de course</h1>
          <br />
          {shoppingLists.length > 0 ? (
            shoppingLists.map((shoppingList) => (
              <ShoppingListCardIndex
                key={shoppingList._id}
                shoppingList={shoppingList}
              />
            ))
          ) : (
            <div className="flex-column text-center">
              <p>Vous avez 0 liste de course...</p>
              <p>
                Ajoutez des listes de course avec{' '}
                <strong>le bouton "Créer une nouvelle liste de course"</strong>{' '}
                ou en passant <strong>par les menus</strong> directement !{' '}
              </p>
            </div>
          )}
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'createShoppingList',
            roleDescription: 'Créer une nouvelle liste de course',
            css: 'add',
          },
        ]}
      />
    </div>
  );
}

export default ShoppingListIndex;
