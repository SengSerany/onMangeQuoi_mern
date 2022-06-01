import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveUser } from '../features/auth/authSlice';
import AuthRedirectButton from '../components/AuthRedirectButton';

function Profile() {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.id !== null && !user.email) {
      dispatch(retrieveUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if (isLoading) {
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>;
  }

  return (
    <div className="page-container">
      <div className="profile-page">
        <h3>Votre adresse email</h3>
        <p>{user.email}</p>
        <br />
        <AuthRedirectButton use="edit" />
        <AuthRedirectButton use="logout" />
      </div>
    </div>
  );
}

export default Profile;
