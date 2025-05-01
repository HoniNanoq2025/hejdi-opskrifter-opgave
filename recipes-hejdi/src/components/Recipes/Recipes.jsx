import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Recipes.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
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

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem("likedRecipes");
      if (storedLikes) {
        setLikedRecipes(JSON.parse(storedLikes));
      }
    } catch (error) {
      console.error("Fejl ved indlæsning af opskrifter:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (likedRecipes.length > 0) {
        localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
      } else if (
        likedRecipes.length === 0 &&
        localStorage.getItem("likedRecipes")
      ) {
        localStorage.setItem("likedRecipes", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Fejl da du gemte opskrifterne:", error);
    }
  }, [likedRecipes]);

  const toggleLike = (recipeId) => {
    if (likedRecipes.includes(recipeId)) {
      setLikedRecipes(likedRecipes.filter((id) => id !== recipeId));
    } else {
      setLikedRecipes([...likedRecipes, recipeId]);
    }
  };

  const isLiked = (recipeId) => {
    return likedRecipes.includes(recipeId);
  };

  return (
    <div className={styles.cardContainer}>
      {recipes.map((recipe) => (
        <div className={styles.item} key={recipe.id}>
          <div className={styles.card}>
            <img src={recipe.image} alt={recipe.name} height={200} />
            <h5 className={styles.cardTitle}>{recipe.name}</h5>
            <div className={styles.rating}>
              <h6>{recipe.reviewCount} reviews</h6>
              <h6>Rating: {recipe.rating}</h6>
            </div>
            <div className={styles.buttons}>
              <button onClick={() => navigate(`/recipe/${recipe.id}`)}>
                Read more
              </button>
              <button
                className={`${styles.likeBtn} ${
                  isLiked(recipe.id) ? styles.liked : ""
                }`}
                onClick={() => toggleLike(recipe.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
