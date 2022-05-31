import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { login, register } from '../features/auth/authSlice';
import AuthRedirectButton from './AuthRedirectButton';

function AuthForm({ title }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading } = useSelector((state) => state.auth);
  const [dataForm, setDataForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const { username, email, password, passwordConfirm } = dataForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prevDataState) => {
      return {
        ...prevDataState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.pathname === '/register') {
      const userData = {
        username,
        email,
        password,
        passwordConfirm,
      };

      dispatch(register(userData));
    } else if (location.pathname === '/login') {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };

  if (isLoading) {
    <div class="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {location.pathname === '/register' && (
          <input
            type="text"
            className=""
            id="username"
            name="username"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          className=""
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          className=""
          id="password"
          name="password"
          value={password}
          placeholder="Mot de passe"
          onChange={handleChange}
        />
        {location.pathname === '/register' && (
          <input
            type="password"
            className=""
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            placeholder="Confirmation de mot de passe"
            onChange={handleChange}
          />
        )}
        <br />
        <button type="submit">{title}</button>
      </form>
      <br />
      <AuthRedirectButton />
    </>
  );
}

export default AuthForm;
