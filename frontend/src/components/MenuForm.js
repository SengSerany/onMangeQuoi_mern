import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MenuForm() {
  const location = useLocation();
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
    // const { name, value } = e.target;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="dish-form" onSubmit={handleSubmit}>
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
