import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import FixedActionButton from '../../components/FixedActionButton';
import { BiRightArrowCircle, BiDownArrowCircle } from 'react-icons/bi';

function DishShow() {
  const params = useParams();
  const { dishes } = useSelector((state) => state.dish);
  const currentDish = dishes.find((dish) => dish._id === params.id);
  const [ingredientsToggleOpen, setIngredientsToggleOpen] = useState(false);

  const handleShowIngredients = () => {
    if (ingredientsToggleOpen) {
      setIngredientsToggleOpen(false);
    } else if (!ingredientsToggleOpen) {
      setIngredientsToggleOpen(true);
    }
  };

  return (
    <div>
      <div className="page-container">
        <div className="dish-show-page">
          <h1>{currentDish.name}</h1>
          <div
            className={`dish-show-ingredients-h3`}
            onClick={handleShowIngredients}
          >
            <h3>Ingrédients ({currentDish.forPeopleNumber} pers.):</h3>
            {ingredientsToggleOpen ? (
              <BiDownArrowCircle />
            ) : (
              <BiRightArrowCircle />
            )}
          </div>
          {ingredientsToggleOpen && (
            <ul className="dish-show-ingredients-ul">
              {currentDish.ingredients.map((ingredientsInfos) => {
                if (typeof ingredientsInfos.quantity === 'number') {
                  return (
                    <li
                      key={ingredientsInfos._id}
                      className="dish-show-ingredients-li"
                    >{`${ingredientsInfos.ingredientName} (${
                      ingredientsInfos.quantity + ' ' + ingredientsInfos.unit
                    })`}</li>
                  );
                } else {
                  return (
                    <li
                      key={ingredientsInfos._id}
                      className="dish-show-ingredients-li"
                    >{`${ingredientsInfos.ingredientName}`}</li>
                  );
                }
              })}
            </ul>
          )}
          <br />
          {currentDish.recipe.length > 0 && (
            <div className="dish-show-recipe">
              <h3>Recette</h3>
              <p>{currentDish.recipe}</p>
            </div>
          )}
          <div className="delete-dish-link">
            <p>Supprimer le plat</p>
          </div>
          <div className="space-behind-fixed-button"></div>
        </div>
      </div>
      <FixedActionButton
        actions={[
          { role: '', roleDescription: 'Modifier le plat', css: 'edit' },
          {
            role: '',
            roleDescription: 'Ajouter le plat a un menu',
            css: 'add',
          },
        ]}
      />
    </div>
  );
}

export default DishShow;
