import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { indexDishes } from '../../features/dish/dishSlice';
import DishCardIndex from '../../components/DishCardIndex';
import DishToasts from '../../components/DishToasts';

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
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
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
  );
}

export default DishIndex;
