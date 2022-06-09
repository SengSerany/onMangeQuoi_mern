import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { indexMenus } from '../../features/menu/menuSlice';
import MenuCardIndex from '../../components/MenuCardIndex';
import FixedActionButton from '../../components/FixedActionButton';
import Spinner from '../../components/Spinner';

function MenuIndex() {
  const dispatch = useDispatch();
  const { menus, menuLoading } = useSelector((state) => state.menu);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (isRead) return;
    setIsRead(true);
    if (menus.length === 0) {
      dispatch(indexMenus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (menuLoading) {
    return <Spinner />;
  }

  return (
    <div>
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
