import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createDish, updateDish } from '../features/dish/dishSlice';
import { FaPlusCircle } from 'react-icons/fa';

function DishForm({
  currentDish = {
    _id: '',
    name: '',
    ingredients: [],
    forPeopleNumber: '',
    recipe: '',
  },
}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const actionBtnLabel = () => {
    if (location.pathname.endsWith('new')) {
      return 'Ajouter';
    } else if (location.pathname.endsWith('edit')) {
      return 'Modifier';
    }
  };
  const [buttonLabel] = useState(actionBtnLabel());
  const ingredientInitialState = {
    ingredientName: '',
    quantity: '',
    unit: '',
  };
  const [ingredientsElements, setIngredientsElements] = useState(
    currentDish.ingredients.length > 0
      ? currentDish.ingredients
      : [ingredientInitialState]
  );

  const [formData, setFormData] = useState({
    name: currentDish.name,
    forPeopleNumber: currentDish.forPeopleNumber,
    recipe: currentDish.recipe,
  });
  const { name, forPeopleNumber, recipe } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleChangeIngredients = (indexArg, event) => {
    const { name, value } = event.target;
    const newIngrData = ingredientsElements.map((ingredient, indexElement) => {
      if (indexElement === indexArg) {
        return { ...ingredient, [name]: value };
      } else {
        return ingredient;
      }
    });
    setIngredientsElements(newIngrData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      ...formData,
      ingredients: ingredientsElements,
    };
    if (location.pathname.endsWith('new')) {
      dispatch(createDish(reqData));
    } else if (location.pathname.endsWith('edit')) {
      reqData.dishId = currentDish._id;
      dispatch(updateDish(reqData));
    }
  };

  const handleAddIngredients = () => {
    setIngredientsElements((prevIngredients) => {
      return [...prevIngredients, ingredientInitialState];
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Nom du plat</label>
          <input
            required
            type="text"
            className=""
            id="name"
            name="name"
            value={name}
            placeholder="Ex: P??te carbonnara"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Ingredient pour combien de personne ?</label>
          <input
            required
            type="number"
            min="1"
            className=""
            id="forPeopleNumber"
            name="forPeopleNumber"
            value={forPeopleNumber}
            placeholder="Ajouter un chiffre"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="ingredients-label">Ingredients</label>
          {ingredientsElements.map((ingredientInput, index) => {
            return (
              <div
                className="form-control ingredient"
                key={`name${index}ingredient`}
              >
                <label>{`Ingredient ${index + 1}`}</label>
                <input
                  required
                  type="text"
                  className=""
                  name="ingredientName"
                  value={ingredientInput.ingredientName}
                  placeholder="Nom de l'ingredient"
                  onChange={(event) => handleChangeIngredients(index, event)}
                />
                <input
                  required
                  type="number"
                  min="0"
                  step=".01"
                  className=""
                  name="quantity"
                  value={ingredientInput.quantity}
                  placeholder="Quantit??"
                  onChange={(event) => handleChangeIngredients(index, event)}
                />
                <label className="choose">Choisissez une unit?? de mesure</label>
                <select
                  required
                  type="text"
                  className=""
                  name="unit"
                  placeholder="Unit??"
                  value={ingredientInput.unit}
                  onChange={(event) => handleChangeIngredients(index, event)}
                >
                  <option value="none">Aucune</option>
                  <option value="unity">Unit??</option>
                  <option value="soupeSpoon">Cuill??re ?? soupe</option>
                  <option value="coffeeSpoon">Cuill??re ?? caf??</option>
                  <option value="kilo">Kilogramme</option>
                  <option value="gram">Gramme</option>
                  <option value="centigram">Centigramme</option>
                  <option value="liter">Litre</option>
                  <option value="centiliter">Centilitre</option>
                </select>
              </div>
            );
          })}
          <div
            className="add-ingredients-button"
            onClick={handleAddIngredients}
          >
            <p>Ajouter un ingr??dient</p>
            <em>
              <FaPlusCircle />
            </em>
          </div>
        </div>
        <div className="form-control">
          <label>Recette</label>
          <textarea
            type="text"
            className=""
            id="recipe"
            name="recipe"
            value={recipe}
            placeholder="Entrer la recette ici"
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">{buttonLabel}</button>
      </form>
      <br />
    </>
  );
}

export default DishForm;
