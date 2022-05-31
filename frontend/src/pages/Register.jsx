import AuthHeadForm from '../components/AuthHeadForm';
import AuthForm from '../components/AuthForm';

function Register() {
  const pageTitle = "S'inscrire";
  return (
    <div className="auth-page">
      <AuthHeadForm title={pageTitle} />
      <AuthForm title={pageTitle} />
    </div>
  );
}

export default Register;
