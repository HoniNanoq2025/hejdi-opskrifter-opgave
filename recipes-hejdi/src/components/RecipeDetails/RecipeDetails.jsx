import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipeDetails.module.css";

/**
 * Komponent til visning af detaljeret information om en enkelt opskrift
 * @returns {JSX.Element} - Renderer en detaljeret visning af den valgte opskrift
 */
export default function RecipeDetail() {
  // Hent id-parameteren fra URL'en via useParams hook
  const { id } = useParams();
  // State til at gemme den hentede opskrift
  const [recipe, setRecipe] = useState(null);

  /**
   * Henter den specifikke opskrift fra API'en baseret på ID
   * Denne effekt kører når ID'et ændres (f.eks. hvis brugeren navigerer til en anden opskrift)
   */
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

  // Vis en indlæsningsbesked hvis opskriften ikke er hentet endnu
  if (!recipe) return <p>Indlæser...</p>;

  return (
    <div className={styles.recipeDetail}>
      {/* Overskrift sektion */}
      <div className={styles.headerTitle}>
        <h2>{recipe.name}</h2>
      </div>
      {/* Billede sektion */}
      <div className={styles.headerImg}>
        <img src={recipe.image} alt={recipe.name} height={600} />
      </div>
      {/* Midtersektion med generelle oplysninger */}
      <div className={styles.center}>
        <div className={styles.details}>
          {/* Tid og portioner */}
          <div className={styles.time}>
            <h5>
              <bold>Servings: </bold>
              {recipe.servings} pers.
            </h5>
            <h5>
              <bold>Preparation time:</bold> {recipe.prepTimeMinutes} min.
            </h5>
            <h5>
              <bold>Cooking time:</bold> {recipe.cookTimeMinutes} min.
            </h5>
          </div>
          {/* Sværhedsgrad, måltidstype og køkken */}
          <div className={styles.info}>
            <h5>
              <bold>Difficulty:</bold> {recipe.difficulty}
            </h5>
            <h5>
              <bold>Meal type:</bold>{" "}
              {/* Håndterer både tilfælde hvor måltidstype er et array og en enkelt værdi */}
              {Array.isArray(recipe.mealType)
                ? recipe.mealType.join(", ")
                : recipe.mealType}
            </h5>
            <h5>
              <bold>Cuisine:</bold> {recipe.cuisine}
            </h5>
          </div>
          {/* Kalorier pr. portion */}
          <div className={styles.calories}>
            <h5>
              <bold>Calories per serving:</bold> {recipe.caloriesPerServing}{" "}
              kcal
            </h5>
          </div>
        </div>
      </div>
      {/* Ingredienser og fremgangsmåde */}
      <div className={styles.instructions}>
        {/* Ingrediensliste */}
        <div className={styles.ingredients}>
          <h4>Ingredienser</h4>
          <ul>
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        {/* Fremgangsmåde */}
        <div className={styles.prep}>
          <h4>Fremgangsmåde</h4>
          <div>
            {/* Håndterer både tilfælde hvor instruktioner er et array og en enkelt tekst */}
            {Array.isArray(recipe.instructions) ? (
              <ul>
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            ) : (
              <p>{recipe.instructions}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
