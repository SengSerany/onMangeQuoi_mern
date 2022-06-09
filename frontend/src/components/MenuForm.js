import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createMenu } from '../features/menu/menuSlice';

function MenuForm() {
  const location = useLocation();
  const dispatch = useDispatch();
  const initialFormData = { menuName: '' };
  const actionBtnLabel = () => {
    if (location.pathname.endsWith('new')) {
      return 'Créer';
    } else if (location.pathname.endsWith('edit')) {
      return 'Modifier';
    }
  };

  const [buttonLabel] = useState(actionBtnLabel());
  const [formData, setFormData] = useState(initialFormData);
  const { menuName } = formData;

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
    dispatch(createMenu(formData));
  };

  const log = () => {
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <button onClick={log}>LOG</button>
      <div className="form-control">
        <label>Nom du menu</label>
        <input
          type="text"
          className=""
          id="menuName"
          name="menuName"
          value={menuName}
          placeholder="Ex: Noël, Semaine 12, ect."
          onChange={handleChange}
        />
      </div>
      <br />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default MenuForm;
