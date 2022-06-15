import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetShoppingListState } from '../features/shoppingList/shoppingListSlice';
import { toast } from 'react-toastify';

function ShoppingListToasts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shoppingListSuccess, shoppingListError, shoppingListMessage } =
    useSelector((state) => state.shoppingList);

  useEffect(() => {
    if (shoppingListError) {
      toast.error(shoppingListMessage);
    }

    if (shoppingListSuccess) {
      navigate('/shopping-list');
      toast.success(shoppingListMessage);
    }

    if (shoppingListError || shoppingListSuccess) {
      dispatch(resetShoppingListState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListError, shoppingListSuccess]);
  return <div id="shoppingListToast"></div>;
}

export default ShoppingListToasts;
