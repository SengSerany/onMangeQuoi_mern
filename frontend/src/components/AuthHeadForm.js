import logo from '../images/logo.png';

function AuthHeadForm({ title }) {
  return (
    <div className="auth-page">
      <img src={logo} alt="brand logo" className="auth-logo" />
      <h1>{title}</h1>
    </div>
  );
}

export default AuthHeadForm;
