import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

function DishForm({ formLabel }) {
  const [ingredientsNb, setIngredientsNb] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const ingredientsAddForm = (nb) => {
    return (
      <div className="form-control ingredient" key={`ingredient-nb-${nb}`}>
        <label>{`Ingredient ${nb}`}</label>
        <input
          type="text"
          className=""
          id={`ingredient-${nb}-name`}
          name={`ingredient-${nb}-name`}
          // value={`ingredient-${ingredientsNb}-name`}
          placeholder="Nom de l'ingredient"
          // onChange={handleChange}
        />
        <input
          type="number"
          className=""
          id={`ingredient-${nb}-quantity`}
          name={`ingredient-${nb}-quantity`}
          // value={`ingredient-${ingredientsNb}-quantity`}
          placeholder="Quantité"
          // onChange={handleChange}
        />
        <select
          type="text"
          className=""
          id={`ingredient-${nb}-unit`}
          name={`ingredient-${nb}-unit`}
          placeholder="Unité"
          // onChange={handleChange}
        >
          <option className="text-grey">Choisissez une unité de mesure</option>
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
  };

  const handleAddIngredients = () => {
    setIngredientsNb((prevNb) => {
      const newNb = prevNb + 1;
      return newNb;
    });
    setIngredientsList((prevList) => {
      return [...prevList, ingredientsAddForm(ingredientsNb)];
    });
  };
  return (
    <>
      <form className="dish-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Nom du plat</label>
          <input
            type="text"
            className=""
            id="name"
            name="name"
            //   value={name}
            placeholder="Ex: Pâte carbonnara"
            //   onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Ingredient pour combien de personne ?</label>
          <input
            type="number"
            className=""
            id="forPeopleNumber"
            name="forPeopleNumber"
            // value={forPeopleNumber}
            placeholder="Ajouter un chiffre"
            // onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label>Ingredients</label>
          {ingredientsList.length > 0 &&
            ingredientsList.map((ingredient) => {
              return ingredient;
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
            // value={recipe}
            placeholder="Entrer la recette ici"
            // onChange={handleChange}
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
