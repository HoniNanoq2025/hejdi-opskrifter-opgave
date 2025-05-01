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
      <div className={styles.detailHeader}>
        <div className={styles.ingredients}>
          <h4>Ingredienser</h4>
          <ul>
            {recipe.ingredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <img src={recipe.image} alt={recipe.name} />
      </div>
      <div className={styles.instructions}>
        <h4>Fremgangsmåde</h4>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}
