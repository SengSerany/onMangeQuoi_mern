import AuthHeadForm from '../components/AuthHeadForm';
import AuthForm from '../components/AuthForm';
import AuthToasts from '../components/AuthToasts';

function Login() {
  const pageTitle = 'Se connecter';
  return (
    <div className="page-container">
      <AuthToasts />
      <div className="auth-page login">
        <AuthHeadForm title={pageTitle} />
        <AuthForm title={pageTitle} />
      </div>
    </div>
  );
}

export default Login;
