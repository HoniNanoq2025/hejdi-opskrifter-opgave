import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Recipes.module.css";
import Filter from "../Filter/Filter";
import Search from "../Search/Search";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SortRating from "../SortRating/SortRating";

/**
 * Hovedkomponent der viser en liste over opskrifter med mulighed for søgning, filtrering og sortering
 * @returns {JSX.Element} - Renderer hele opskriftssiden
 */
export default function Recipes() {
  // State til at gemme alle opskrifter fra API'en
  const [recipes, setRecipes] = useState([]);
  // State til at gemme filtrerede opskrifter der vises på siden
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  // State til at gemme ID'er på opskrifter som brugeren har liket
  const [likedRecipes, setLikedRecipes] = useState([]);
  // State til at gemme det nuværende søgeord
  const [searchTerm, setSearchTerm] = useState("");
  // State til filtrering
  const [filterType, setFilterType] = useState("mealType"); // Standardfilter er måltidstype
  const [filterValue, setFilterValue] = useState(""); // Tom filterværdi betyder "vis alle"
  // State til sortering efter vurdering ("" = ingen sortering, "asc" = lav til høj, "desc" = høj til lav)
  const [sortDirection, setSortDirection] = useState("");
  // Hook til at navigere mellem sider
  const navigate = useNavigate();

  /**
   * Henter opskrifter fra API'en når komponenten indlæses
   */
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes); // Vis alle opskrifter til at starte med
      } catch (error) {
        console.error("Fejl ved hentning af opskrifter", error);
      }
    };

    fetchRecipes();
  }, []);

  /**
   * Indlæser gemte "likes" fra lokallagring (localStorage) når komponenten indlæses
   */
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

  /**
   * Gemmer "likes" i lokallagring (localStorage) når de ændres
   */
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

  /**
   * Anvender filtre og sortering på opskrifterne når nogen af filter-parametrene ændres
   */
  useEffect(() => {
    if (recipes.length === 0) return; // Filtrer ikke hvis opskrifterne ikke er indlæst endnu

    let filtered = [...recipes];

    // Filtrer efter den valgte filtertype og værdi
    if (filterValue) {
      filtered = filtered.filter((recipe) => {
        // Håndterer både tilfælde hvor filterværdien er et array eller en enkelt værdi
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

    // Anvend søgefilter hvis der er et søgeord
    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Anvend sortering efter vurdering hvis der er valgt en sorteringsretning
    if (sortDirection) {
      filtered.sort((a, b) => {
        if (sortDirection === "asc") {
          return a.rating - b.rating; // Lav til Høj rating
        } else {
          return b.rating - a.rating; // Høj til Lav rating
        }
      });
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, filterType, filterValue, sortDirection]);

  /**
   * Skifter mellem at like og unlike en opskrift
   * @param {number} recipeId - ID på den opskrift der skal likes/unlikes
   */
  const toggleLike = (recipeId) => {
    if (likedRecipes.includes(recipeId)) {
      setLikedRecipes(likedRecipes.filter((id) => id !== recipeId));
    } else {
      setLikedRecipes([...likedRecipes, recipeId]);
    }
  };

  /**
   * Tjekker om en opskrift er liket
   * @param {number} recipeId - ID på den opskrift der skal tjekkes
   * @returns {boolean} - True hvis opskriften er liket, ellers false
   */
  const isLiked = (recipeId) => {
    return likedRecipes.includes(recipeId);
  };

  /**
   * Opdaterer filtertypen (måltidstype eller køkken)
   * @param {string} newFilterType - Den nye filtertype
   */
  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType);
  };

  /**
   * Opdaterer filterværdien (specifik måltidstype eller køkken)
   * @param {string} newFilterValue - Den nye filterværdi
   */
  const handleFilterValueChange = (newFilterValue) => {
    setFilterValue(newFilterValue);
  };

  /**
   * Opdaterer sorteringsretningen
   * @param {string} direction - Den nye sorteringsretning ("asc", "desc" eller "")
   */
  const handleSortChange = (direction) => {
    setSortDirection(direction);
  };

  return (
    <div>
      <div className={styles.searchBar}>
        <Search setSearchTerm={setSearchTerm} />
      </div>

      <div className={styles.filtering}>
        {/* Filter-komponenten med props til filtrering */}
        <div className={styles.filter}>
          <Filter
            recipes={recipes}
            filterType={filterType}
            filterValue={filterValue}
            onFilterTypeChange={handleFilterTypeChange}
            onFilterValueChange={handleFilterValueChange}
          />
        </div>

        <div className={styles.sorting}>
          {/* Sorteringsknap-komponenten */}
          <SortRating
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        {/* Render filtrerede opskrifter som kort */}
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
