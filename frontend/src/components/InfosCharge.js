import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexDishes } from '../features/dish/dishSlice';
import { indexMenus } from '../features/menu/menuSlice';
import Spinner from './Spinner';

function InfosCharge() {
  const dispatch = useDispatch();
  const { dishes, dishLoading } = useSelector((state) => state.dish);
  const { menus, menuLoading } = useSelector((state) => state.menu);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (isRead) return;
    setIsRead(true);
    if (dishes && dishes.length === 0) {
      dispatch(indexDishes());
    }
    if (menus && menus.length === 0) {
      dispatch(indexMenus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (dishLoading) {
    return <Spinner />;
  }

  if (menuLoading) {
    return <Spinner />;
  }

  return <div></div>;
}

export default InfosCharge;
