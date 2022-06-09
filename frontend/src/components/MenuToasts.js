import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetMenuState } from '../features/menu/menuSlice';
import { toast } from 'react-toastify';

function MenuToasts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menuSuccess, menuError, menuMessage } = useSelector(
    (state) => state.menu
  );

  useEffect(() => {
    if (menuError) {
      toast.error(menuMessage);
    }

    if (menuSuccess) {
      navigate('/menus');
      toast.success(menuMessage);
    }

    if (menuError || menuSuccess) {
      dispatch(resetMenuState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuError, menuSuccess]);
  return <div id="menuToast"></div>;
}

export default MenuToasts;
