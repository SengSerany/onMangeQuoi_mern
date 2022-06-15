import { useSelector } from 'react-redux';
import InfosCharge from '../../components/InfosCharge';
import MenuCardIndex from '../../components/MenuCardIndex';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function MenuIndex() {
  const { menus, menuLoading } = useSelector((state) => state.menu);

  if (menuLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <InfosCharge />
      <div className="page-container">
        <div className="flex-column">
          <h1>Mes Menus</h1>
          <br />
          {menus.length !== 0 &&
            menus.map((menuInfos) => (
              <MenuCardIndex key={menuInfos._id} menu={menuInfos} />
            ))}
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'createMenu',
            roleDescription: 'Créer un nouveau menu',
            css: 'add',
          },
        ]}
      />
    </div>
  );
}

export default MenuIndex;
