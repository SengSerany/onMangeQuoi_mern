import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="page-container">
      <div>
        <h1>Dashboard</h1>
        <br />
        <Link to="/dishes">
          <button>Mes plats</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
