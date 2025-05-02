import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Recipes.module.css";
import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Add state for filter values
  const [filterType, setFilterType] = useState("mealType");
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  // Fetch recipes from the API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes); // Initially show all recipes
      } catch (error) {
        console.error("Fejl ved hentning af opskrifter", error);
      }
    };

    fetchRecipes();
  }, []);

  // Handle liking/unliking recipes
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

  // Apply filters whenever recipes, searchTerm, filterType, or filterValue changes
  useEffect(() => {
    if (recipes.length === 0) return; // Don't filter if recipes aren't loaded yet

    let filtered = [...recipes];

    // Filter by selected filter type and value
    if (filterValue) {
      filtered = filtered.filter((recipe) => {
        const recipeFilterValues = Array.isArray(recipe[filterType])
          ? recipe[filterType]
          : [recipe[filterType]];

        return recipeFilterValues.some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, filterType, filterValue]);

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

  // These functions update the filter state but don't directly filter recipes
  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  const handleFilterValueChange = (newFilterValue) => {
    setFilterValue(newFilterValue);
  };

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />

      {/* Updated Filter component props */}
      <Filter
        recipes={recipes}
        filterType={filterType}
        filterValue={filterValue}
        onFilterTypeChange={handleFilterTypeChange}
        onFilterValueChange={handleFilterValueChange}
      />

      <div className={styles.cardContainer}>
        {/* Render filtered recipes */}
        {filteredRecipes.map((recipe) => (
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
    </div>
  );
}
