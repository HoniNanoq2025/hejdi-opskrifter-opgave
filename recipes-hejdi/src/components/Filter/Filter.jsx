import { useMemo } from "react";
import styles from "./Filter.module.css";

/**
 * Komponent til filtrering af opskrifter baseret på måltidstype eller køkken
 *
 * @param {Array} recipes - Liste af alle opskrifter
 * @param {string} filterType - Den valgte filtertype ("mealType" eller "cuisine")
 * @param {string} filterValue - Den valgte filterværdi
 * @param {function} onFilterTypeChange - Callback funktion til at ændre filtertypen
 * @param {function} onFilterValueChange - Callback funktion til at ændre filterværdien
 * @returns {JSX.Element} - Renderer to dropdown-menuer til filtrering
 */
function Filter({
  recipes,
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
}) {
  /**
   * Beregner de tilgængelige filterværdier baseret på den valgte filtertype
   * Bruger useMemo for at undgå genberegning ved hver rendering
   */
  const filterOptions = useMemo(() => {
    return Array.from(
      new Set(
        recipes.flatMap(
          (recipe) =>
            Array.isArray(recipe[filterType])
              ? recipe[filterType] // hvis værdien er et array
              : [recipe[filterType]] // hvis værdien er en enkelt streng
        )
      )
    );
  }, [recipes, filterType]);

  return (
    <div className={styles.filter}>
      <div className={styles.dropDown}>
        {/* Dropdown til valg af filtertype */}
        <select
          onChange={(e) => onFilterTypeChange(e.target.value)}
          value={filterType}
        >
          <option value="mealType">Meal Type</option>
          <option value="cuisine">Kitchen</option>
        </select>
        {/* Dropdown til valg af filterværdi baseret på den valgte filtertype */}
        <select
          onChange={(e) => onFilterValueChange(e.target.value)}
          value={filterValue}
        >
          <option value="">All</option>
          {filterOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filter;
