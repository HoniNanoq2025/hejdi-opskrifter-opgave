import { useMemo } from "react";
import styles from "./Filter.module.css";

function Filter({
  recipes,
  filterType,
  filterValue,
  onFilterTypeChange,
  onFilterValueChange,
}) {
  // Calculate available filter options based on selected filter type
  // Use useMemo to avoid recalculating on every render
  const filterOptions = useMemo(() => {
    return Array.from(
      new Set(
        recipes.flatMap(
          (recipe) =>
            Array.isArray(recipe[filterType])
              ? recipe[filterType] // if value is an array
              : [recipe[filterType]] // if value is a single string
        )
      )
    );
  }, [recipes, filterType]);

  return (
    <div className={styles.filter}>
      <div className={styles.dropDown}>
        <select
          onChange={(e) => onFilterTypeChange(e.target.value)}
          value={filterType}
        >
          <option value="mealType">Måltidstype</option>
          <option value="cuisine">Køkken</option>
        </select>
        <select
          onChange={(e) => onFilterValueChange(e.target.value)}
          value={filterValue}
        >
          <option value="">Alle</option>
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
