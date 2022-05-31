import AuthHeadForm from '../components/AuthHeadForm';
import AuthForm from '../components/AuthForm';

function Login() {
  const pageTitle = 'Se connecter';
  return (
    <div className="auth-page">
      <AuthHeadForm title={pageTitle} />
      <AuthForm title={pageTitle} />
    </div>
  );
}

export default Login;
