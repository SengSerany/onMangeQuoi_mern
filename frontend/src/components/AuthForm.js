import { useLocation } from 'react-router-dom';

function AuthForm({ title }) {
  const location = useLocation();
  console.log(location);

  return (
    <form>
      {location.pathname === '/register' && (
        <input
          type="text"
          className=""
          id="username"
          name="username"
          // value={username}
          placeholder="Nom d'utilisateur"
          // onChange={handleChange}
        />
      )}
      <input
        type="email"
        className=""
        id="email"
        name="email"
        // value={email}
        placeholder="Email"
        // onChange={handleChange}
      />
      <input
        type="password"
        className=""
        id="password"
        name="password"
        // value={password}
        placeholder="Mot de passe"
        // onChange={handleChange}
      />
      {location.pathname === '/register' && (
        <input
          type="passwordConfirm"
          className=""
          id="passwordConfirm"
          name="passwordConfirm"
          // value={password}
          placeholder="Confirmation de mot de passe"
          // onChange={handleChange}
        />
      )}
      <br />
      <button type="submit" className="">
        {title}
      </button>
    </form>
  );
}

export default AuthForm;
