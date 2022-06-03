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

  let key = 0;

  return (
    <div className="fixed-action-button">
      {actions.map((action) => {
        key += 1;
        return (
          <Link
            key={`action-${key}`}
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
