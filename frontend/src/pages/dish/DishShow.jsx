import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { deleteDish } from '../../features/dish/dishSlice';
import FixedActionButton from '../../components/FixedActionButton';
import { BiRightArrowCircle, BiDownArrowCircle } from 'react-icons/bi';

function DishShow() {
  const params = useParams();
  const dispatch = useDispatch();
  const { dishes, dishLoading } = useSelector((state) => state.dish);
  const currentDish = dishes.find((dish) => dish._id === params.id)
    ? dishes.find((dish) => dish._id === params.id)
    : {};
  const [ingredientsToggleOpen, setIngredientsToggleOpen] = useState(false);

  const handleShowIngredients = () => {
    if (ingredientsToggleOpen) {
      setIngredientsToggleOpen(false);
    } else if (!ingredientsToggleOpen) {
      setIngredientsToggleOpen(true);
    }
  };

  const translateUnits = (unitLabel) => {
    let unitTrad;
    switch (unitLabel) {
      case 'unity':
        unitTrad = 'unité';
        break;
      case 'soupeSpoon':
        unitTrad = 'c. à s.';
        break;
      case 'coffeeSpoon':
        unitTrad = 'c. à c.';
        break;
      case 'kilo':
        unitTrad = 'kg';
        break;
      case 'gram':
        unitTrad = 'g';
        break;
      case 'centigram':
        unitTrad = 'cg';
        break;
      case 'liter':
        unitTrad = 'litre';
        break;
      case 'centiliter':
        unitTrad = 'cl';
        break;
      default:
        unitLabel = '';
    }
    return unitTrad;
  };

  if (dishLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="page-container">
        <div className="flex-column">
          <p className="color-grey1 no-margin text-center">plat :</p>
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
                      ingredientsInfos.quantity +
                      ' ' +
                      translateUnits(ingredientsInfos.unit)
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
          {currentDish.recipe !== '' ? (
            <div className="dish-show-recipe">
              <h3>Recette</h3>
              <p>{currentDish.recipe}</p>
            </div>
          ) : (
            <p>Tu n'as pas renseigné de recette</p>
          )}
          <div
            className="delete-link"
            onClick={() => dispatch(deleteDish(params.id))}
          >
            <p>Supprimer le plat</p>
          </div>
          <div className="space-behind-fixed-button"></div>
        </div>
      </div>
      <FixedActionButton
        actions={[
          {
            role: 'editDish',
            roleDescription: 'Modifier le plat',
            css: 'edit',
            currentID: currentDish._id,
          },
          {
            role: 'addToMenu',
            roleDescription: 'Ajouter le plat a un menu',
            css: 'add',
            currentID: currentDish._id,
          },
        ]}
      />
    </div>
  );
}

export default DishShow;
