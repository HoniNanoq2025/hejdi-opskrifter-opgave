import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Recipes.module.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Fejl ved hentning af opskrifter", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {recipes.map((recipe) => (
        <div className={styles.item} key={recipe.id}>
          <div className={styles.card}>
            <img src={recipe.image} alt={recipe.name} height={200} />
            <h5 className={styles.cardContent}>{recipe.name}</h5>
            <button onClick={() => navigate(`/recipe/${recipe.id}`)}>
              Læs mere
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
