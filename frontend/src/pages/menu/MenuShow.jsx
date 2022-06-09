import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
// import { deleteMenu } from '../../features/menu/menuSlice';
import FixedActionButton from '../../components/FixedActionButton';

function MenuShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { menus, menuLoading } = useSelector((state) => state.menu);
  const currentMenu = menus.find((menu) => menu._id === id)
    ? menus.find((menu) => menu._id === id)
    : {};

  if (menuLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="page-container">
        <div className="flex-column">
          <p className="color-grey1 no-margin text-center">menu :</p>
          <h1>{currentMenu.menuName}</h1>
          <br />
          <div
            className="delete-link"
            // onClick={() => dispatch(deleteMenu(id))}
          >
            <p>Supprimer le plat</p>
          </div>
          <div className="space-behind-fixed-button"></div>
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'editMenu',
            roleDescription: 'Modifier le menu',
            css: 'edit',
            currentID: currentMenu._id,
          },
          {
            role: '',
            roleDescription: 'Créer la liste de course',
            css: 'add',
          },
        ]}
      />
    </div>
  );
}

export default MenuShow;
