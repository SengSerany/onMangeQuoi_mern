import { Link } from 'react-router-dom';

function FixedActionButton({
  actions = [{ role: '', roleDescription: '', css: '', currentID: '', by: {} }],
}) {
  const destRoute = (role, currentID) => {
    if (role === 'createDish') {
      return '/dishes/new';
    } else if (role === 'editDish') {
      return `/dishes/${currentID}/edit`;
    } else if (role === 'createMenu') {
      return `/menus/new`;
    } else if (role === 'editMenu') {
      return `/menus/${currentID}/edit`;
    } else if (role === 'addToMenu') {
      return `/dishes/${currentID}/add`;
    } else if (role === 'createShoppingList') {
      return `/shopping-list/new`;
    } else if (role === 'editShoppingList') {
      return `/shopping-list/${currentID}/edit`;
    } else {
      return '/';
    }
  };

  const passProps = (action) => {
    if (action.by && actions.by !== {}) {
      if (action.by.hasOwnProperty('menu')) {
        return action.by;
      } else {
        return {};
      }
    } else {
      return {};
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
            state={passProps(action)}
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
