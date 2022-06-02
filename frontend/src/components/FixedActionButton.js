import { Link } from 'react-router-dom';

function FixedActionButton({
  actions = [{ role: '', roleDescription: '', css: '' }],
}) {
  const destRoute = (role) => {
    if (role === 'createDish') {
      return '/dishes/new';
    } else {
      return '/dishes';
    }
  };

  return (
    <div className="fixed-action-button">
      {actions.map((action) => {
        return (
          <Link
            key={`action-${action.role}`}
            to={destRoute(action.role)}
            className={`${action.css}-btn`}
          >
            <button>{action.roleDescription}</button>
          </Link>
        );
      })}
    </div>
  );
}

export default FixedActionButton;
