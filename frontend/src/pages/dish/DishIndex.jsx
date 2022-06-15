import { useSelector } from 'react-redux';
import InfosCharge from '../../components/InfosCharge';
import DishCardIndex from '../../components/DishCardIndex';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function DishIndex() {
  const { dishes, dishLoading } = useSelector((state) => state.dish);

  if (dishLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <InfosCharge />
      <div className="page-container">
        <div className="flex-column">
          <h1>Mes plats</h1>
          <br />
          {dishes !== null &&
            dishes.map((dishInfos) => (
              <DishCardIndex key={dishInfos._id} dish={dishInfos} />
            ))}
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
