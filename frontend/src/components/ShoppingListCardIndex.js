import { Link } from 'react-router-dom';

function ShoppingListCardIndex({ shoppingList = {} }) {
  return (
    <Link to={`/shopping-list/${shoppingList._id}`}>
      <div className="card-index">
        <p>{shoppingList.shoppingListName}</p>
      </div>
    </Link>
  );
}

export default ShoppingListCardIndex;
