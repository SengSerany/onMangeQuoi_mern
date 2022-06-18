import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexDishes } from '../features/dish/dishSlice';
import { indexMenus } from '../features/menu/menuSlice';
import { indexShoppingLists } from '../features/shoppingList/shoppingListSlice';

function InfosCharge() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { dishes } = useSelector((state) => state.dish);
  const { menus } = useSelector((state) => state.menu);
  const { shoppingLists } = useSelector((state) => state.shoppingList);

  useEffect(() => {
    if (user.id !== null) {
      if (dishes === null) {
        dispatch(indexDishes());
      }
      if (menus === null) {
        dispatch(indexMenus());
      }
      if (shoppingLists === null) {
        dispatch(indexShoppingLists());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

export default InfosCharge;
