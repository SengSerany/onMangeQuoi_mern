import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addDishToMenu } from '../features/menu/menuSlice';

function AddDishToMenuForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { menus } = useSelector((state) => state.menu);

  const [formData, setFormData] = useState({
    dishID: id,
    menuID: '',
    forNbPeople: '',
  });
  const { menuID, forNbPeople } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDishToMenu(formData));
  };

  const log = () => {
    console.log(formData);
  };

  return (
    <>
      <button onClick={log}>LOG</button>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Dans quel menu ?</label>
          <select
            type="text"
            name="menuID"
            value={menuID}
            onChange={handleChange}
          >
            <option className="text-grey">Choisissez un menu</option>
            {menus.map((menu) => {
              return (
                <option key={menu._id} value={menu._id}>
                  {menu.menuName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <label>Pour combien de personne ?</label>
          <input
            type="number"
            min="1"
            className=""
            id="forNbPeople"
            name="forNbPeople"
            value={forNbPeople}
            placeholder="Donner un nombre"
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AddDishToMenuForm;
