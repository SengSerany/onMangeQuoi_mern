import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

function DishForm({ formLabel }) {
  const ingredientInitialState = {
    ingredientName: '',
    quantity: '',
    unit: '',
  };
  const [ingredientsElements, setIngredientsElements] = useState([
    ingredientInitialState,
  ]);

  const [formData, setFormData] = useState({
    name: '',
    forPeopleNumber: '',
    recipe: '',
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
    console.log(reqData);
  };

  const handleAddIngredients = async () => {
    setIngredientsElements((prevIngredients) => {
      return [...prevIngredients, ingredientInitialState];
    });
  };

  const log = () => {
    console.log(formData);
    console.log(ingredientsElements);
  };

  return (
    <>
      <button onClick={log}>LOG</button>
      <form className="dish-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Nom du plat</label>
          <input
            type="text"
            className=""
            id="name"
            name="name"
            value={name}
            placeholder="Ex: Pâte carbonnara"
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Ingredient pour combien de personne ?</label>
          <input
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
          <label>Ingredients</label>
          {ingredientsElements.map((ingredientInput, index) => {
            return (
              <div
                className="form-control ingredient"
                key={`name${index}ingredient`}
              >
                <label>{`Ingredient ${index + 1}`}</label>
                <input
                  type="text"
                  className=""
                  name="ingredientName"
                  value={ingredientInput.name}
                  placeholder="Nom de l'ingredient"
                  onChange={(event) => handleChangeIngredients(index, event)}
                />
                <input
                  type="number"
                  className=""
                  name="quantity"
                  value={ingredientInput.quantity}
                  placeholder="Quantité"
                  onChange={(event) => handleChangeIngredients(index, event)}
                />
                <select
                  type="text"
                  className=""
                  name="unit"
                  placeholder="Unité"
                  value={ingredientInput.unit}
                  onChange={(event) => handleChangeIngredients(index, event)}
                >
                  <option className="text-grey">
                    Choisissez une unité de mesure
                  </option>
                  <option value="unity">Unité</option>
                  <option value="soupeSpoon">Cuillère à soupe</option>
                  <option value="coffeeSpoon">Cuillère à café</option>
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
            <p>Ajouter un ingrédient</p>
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
        <button type="submit">{formLabel}</button>
      </form>
      <br />
    </>
  );
}

export default DishForm;
