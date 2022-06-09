import { Link } from 'react-router-dom';

function FixedActionButton({
  actions = [{ role: '', roleDescription: '', css: '', currentID: '' }],
}) {
  const destRoute = (role, currentID) => {
    if (role === 'createDish') {
      return '/dishes/new';
    } else if (role === 'editDish') {
      return `/dishes/${currentID}/edit`;
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
            to={destRoute(action.role, action.currentID)}
            className={`${action.css}-btn`}
          >
            <button className="action-role-description">
              {action.roleDescription}
            </button>
          </Link>
        );
      })}
    </div>
  );
}

export default FixedActionButton;
