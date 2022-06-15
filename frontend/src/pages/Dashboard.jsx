import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InfosCharge from '../components/InfosCharge';
import { FaPlus } from 'react-icons/fa';
import Spinner from '../components/Spinner';

function Dashboard() {
  const { dishLoading } = useSelector((state) => state.dish);
  const { menuLoading } = useSelector((state) => state.menu);
  const { shoppingListLoading } = useSelector((state) => state.shoppingList);

  if (dishLoading) {
    return <Spinner />;
  }

  if (menuLoading) {
    return <Spinner />;
  }

  if (shoppingListLoading) {
    return <Spinner />;
  }

  return (
    <>
      <InfosCharge />
      <div className="page-container">
        <div className="flex-column justify-center dashboard-menu">
          <h1>Dashboard</h1>
          <br />
          <Link to="/dishes" className="section-category">
            <p>Mes plats</p>
          </Link>
          <Link to="/dishes/new" className="section-category-add">
            <FaPlus className="right-space" /> Créer un nouveau plat
          </Link>
          <Link to="/menus" className="section-category">
            <p>Mes menus</p>
          </Link>
          <Link to="/menus/new" className="section-category-add">
            <FaPlus className="right-space" /> Créer un nouveau menu
          </Link>
          <Link to="/shopping-list" className="section-category">
            <p>Mes listes de course</p>
          </Link>
          <Link to="/shopping-list/new" className="section-category-add">
            <FaPlus className="right-space" /> Créer une nouvelle liste de
            course
          </Link>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
