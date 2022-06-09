import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="page-container">
      <div className="flex-column justify-center">
        <h1>Dashboard</h1>
        <br />
        <Link to="/dishes">
          <button>Mes plats</button>
        </Link>
        <Link to="/menus">
          <button>Mes menus</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
