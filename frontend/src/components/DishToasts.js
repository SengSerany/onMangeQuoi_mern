import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetDishState } from '../features/dish/dishSlice';
import { toast } from 'react-toastify';

function DishToasts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dishSuccess, dishError, dishMessage } = useSelector(
    (state) => state.dish
  );

  useEffect(() => {
    if (dishError) {
      toast.error(dishMessage);
    }

    if (dishSuccess) {
      navigate('/dishes');
      toast.success(dishMessage);
    }

    if (dishError || dishSuccess) {
      dispatch(resetDishState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishError, dishSuccess]);
  return <div className="dishToast"></div>;
}

export default DishToasts;
