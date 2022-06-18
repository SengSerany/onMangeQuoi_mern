import { useSelector } from 'react-redux';
import InfosCharge from '../../components/InfosCharge';
import DishCardIndex from '../../components/DishCardIndex';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function DishIndex() {
  const { dishes, dishLoading } = useSelector((state) => state.dish);
  const { menuLoading } = useSelector((state) => state.menu);
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
          <h1>Mes plats</h1>
          <br />
          {dishes.length > 0 ? (
            dishes.map((dishInfos) => (
              <DishCardIndex key={dishInfos._id} dish={dishInfos} />
            ))
          ) : (
            <div className="flex-column text-center">
              <p>Vous avez 0 plats...</p>
              <p>
                Ajoutez des plats avec{' '}
                <strong>le bouton "Ajouter un nouveau plat"</strong> !{' '}
              </p>
            </div>
          )}
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'createDish',
            roleDescription: 'Ajouter un nouveau plat',
            css: 'add',
          },
        ]}
      />
    </div>
  );
}

export default DishIndex;
