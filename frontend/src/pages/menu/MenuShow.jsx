import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DishCardIndex from '../../components/DishCardIndex';
import Spinner from '../../components/Spinner';
import { deleteMenu } from '../../features/menu/menuSlice';
import FixedActionButton from '../../components/FixedActionButton';

function MenuShow() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { dishes } = useSelector((state) => state.dish);
  const { menus, dishesInMenu, menuLoading } = useSelector(
    (state) => state.menu
  );
  const currentMenu = menus.find((menu) => menu._id === id)
    ? menus.find((menu) => menu._id === id)
    : {};

  const attributeDishes = dishesInMenu.filter((link) => link.menuID === id);

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
          {attributeDishes &&
            attributeDishes.map((linkInfos) => {
              const currentDish = dishes.find(
                (dish) => dish._id === linkInfos.dishID
              );
              return (
                <DishCardIndex
                  key={linkInfos._id}
                  dish={currentDish}
                  forNbPeople={linkInfos.forNbPeople}
                />
              );
            })}
          <div className="delete-link" onClick={() => dispatch(deleteMenu(id))}>
            <p>Supprimer le menu</p>
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
