import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetAuthState } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function AuthToasts() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isSuccess, isError, isUnlogged, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isUnlogged) {
      navigate('/');
    }

    if (isSuccess) {
      if (location.pathname === '/login') {
        navigate('/');
      } else if (location.pathname === '/register') {
        navigate('/login');
      }
      toast.success(message);
    }

    if (isError) {
      toast.error(message);
    }

    if (isError || isSuccess || isUnlogged) {
      dispatch(resetAuthState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isUnlogged]);
  return <div className="authToast"></div>;
}

export default AuthToasts;
