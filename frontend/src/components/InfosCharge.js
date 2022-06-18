import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexDishes } from '../features/dish/dishSlice';
import { indexMenus } from '../features/menu/menuSlice';
import { indexShoppingLists } from '../features/shoppingList/shoppingListSlice';

function InfosCharge() {
  const dispatch = useDispatch();
  const { dishes } = useSelector((state) => state.dish);
  const { menus } = useSelector((state) => state.menu);
  const { shoppingLists } = useSelector((state) => state.shoppingList);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    // must use state because new user have no data and result a loop
    if (isRead) return;
    setIsRead(true);

    if ((dishes && dishes.length === 0) || !dishes) {
      dispatch(indexDishes());
    }
    if ((menus && menus.length === 0) || !menus) {
      dispatch(indexMenus());
    }
    if ((shoppingLists && shoppingLists.length === 0) || !shoppingLists) {
      dispatch(indexShoppingLists());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div></div>;
}

export default InfosCharge;
