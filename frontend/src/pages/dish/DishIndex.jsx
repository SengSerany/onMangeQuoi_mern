import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { indexDishes } from '../../features/dish/dishSlice';
import DishCardIndex from '../../components/DishCardIndex';
import DishToasts from '../../components/DishToasts';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function DishIndex() {
  const dispatch = useDispatch();
  const { dishes, dishLoading } = useSelector((state) => state.dish);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (isRead) return;
    setIsRead(true);
    if (dishes === null) {
      dispatch(indexDishes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dishLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="page-container">
        <DishToasts />
        <div className="dish-index-page">
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
