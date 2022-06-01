import AuthHeadForm from '../components/AuthHeadForm';
import AuthForm from '../components/AuthForm';

function Login() {
  const pageTitle = 'Se connecter';
  return (
    <div className="full-screen bg-yellow">
      <div className="page-container">
        <div className="auth-page login">
          <AuthHeadForm title={pageTitle} />
          <AuthForm title={pageTitle} />
        </div>
      </div>
    </div>
  );
}

export default Login;
