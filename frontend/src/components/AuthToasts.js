import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetAuthState } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function AuthToasts() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isSuccess, isError, isUnlogged, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user.id === null) {
      if (location.pathname !== '/register' && location.pathname !== '/login')
        navigate('/login');
    }

    if (isError) {
      toast.error(message);
    }

    if (isSuccess || isUnlogged) {
      if (location.pathname === '/login') {
        navigate('/');
      } else if (location.pathname === '/register' || isUnlogged) {
        navigate('/login');
      }
      toast.success(message);
    }

    if (isError || isSuccess || isUnlogged) {
      dispatch(resetAuthState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isUnlogged, user.id]);
  return <div className="authToast"></div>;
}

export default AuthToasts;
