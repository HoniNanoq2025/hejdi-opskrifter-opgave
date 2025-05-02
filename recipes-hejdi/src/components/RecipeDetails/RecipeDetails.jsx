import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Fejl ved hentning af detaljer", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Indlæser...</p>;

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.headerTitle}>
        <h2>{recipe.name}</h2>
      </div>
      <div className={styles.headerImg}>
        <img src={recipe.image} alt={recipe.name} height={600} />
      </div>
      <div className={styles.center}>
        <div className={styles.details}>
          <div className={styles.time}>
            <h5>Servings: {recipe.servings} pers.</h5>
            <h5>Preparation time: {recipe.prepTimeMinutes} min.</h5>
            <h5>Cooking time: {recipe.cookTimeMinutes} min.</h5>
          </div>
          <div className={styles.info}>
            <h5>Difficulty: {recipe.difficulty}</h5>
            <h5>
              Meal type:{" "}
              {Array.isArray(recipe.mealType)
                ? recipe.mealType.join(", ")
                : recipe.mealType}
            </h5>
            <h5>Cuisine: {recipe.cuisine}</h5>
          </div>
          <div className={styles.calories}>
            <h5>Calories per serving: {recipe.caloriesPerServing} kcal</h5>
          </div>
        </div>
      </div>
      <div className={styles.instructions}>
        <div className={styles.ingredients}>
          <h4>Ingredienser</h4>
          <ul>
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.prep}>
          <h4>Fremgangsmåde</h4>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}
