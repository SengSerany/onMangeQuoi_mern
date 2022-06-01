import AuthHeadForm from '../components/AuthHeadForm';
import AuthForm from '../components/AuthForm';

function Register() {
  const pageTitle = "S'inscrire";
  return (
    <div className="page-container">
      <div className="auth-page">
        <AuthHeadForm title={pageTitle} />
        <AuthForm title={pageTitle} />
      </div>
    </div>
  );
}

export default Register;
