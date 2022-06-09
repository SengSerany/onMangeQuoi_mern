import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuForm from '../../components/MenuForm';
import Spinner from '../../components/Spinner';

function DishEdit() {
  const { id } = useParams();
  const { menus, menuLoading } = useSelector((state) => state.menu);

  let currentMenu = menus.find((menu) => menu._id === id);

  if (menuLoading) {
    return <Spinner />;
  }

  return (
    <div className="page-container">
      <div className="flex-column justify-center">
        <h1>
          Modifier
          <em>
            <br />"{currentMenu.menuName}"
          </em>
        </h1>
        <br />
        <MenuForm currentMenu={currentMenu} />
      </div>
    </div>
  );
}

export default DishEdit;
