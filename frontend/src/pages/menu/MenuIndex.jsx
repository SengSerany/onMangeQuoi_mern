import { useSelector } from 'react-redux';
import InfosCharge from '../../components/InfosCharge';
import MenuCardIndex from '../../components/MenuCardIndex';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function MenuIndex() {
  const { menus, menuLoading } = useSelector((state) => state.menu);
  const { dishLoading } = useSelector((state) => state.dish);
  const { shoppingListLoading } = useSelector((state) => state.shoppingList);

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
          <h1>Mes Menus</h1>
          <br />
          {menus.length > 0 ? (
            menus.map((menuInfos) => (
              <MenuCardIndex key={menuInfos._id} menu={menuInfos} />
            ))
          ) : (
            <div className="flex-column text-center">
              <p>Vous avez 0 menu...</p>
              <p>
                Ajoutez des menu avec{' '}
                <strong>le bouton "Créer un nouveau menu"</strong> ou en passant{' '}
                <strong>par les plats</strong> directement !{' '}
              </p>
            </div>
          )}
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'createMenu',
            roleDescription: 'Créer un nouveau menu',
            css: 'add',
          },
        ]}
      />
    </div>
  );
}

export default MenuIndex;
