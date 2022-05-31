import AuthHeadForm from '../components/AuthHeadForm';
import AuthForm from '../components/AuthForm';
import AuthToasts from '../components/AuthToasts';

function Register() {
  const pageTitle = "S'inscrire";
  return (
    <div className="bg-white">
      <AuthToasts />
      <div className="page-container">
        <div className="auth-page">
          <AuthHeadForm title={pageTitle} />
          <AuthForm title={pageTitle} />
        </div>
      </div>
    </div>
  );
}

export default Register;
