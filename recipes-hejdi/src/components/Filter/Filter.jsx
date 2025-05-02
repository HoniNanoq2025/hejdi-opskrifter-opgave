import { useState, useEffect } from "react";

function Filter({ recipes, onFilterChange }) {
  const [filterType, setFilterType] = useState("mealType"); // Default filter type
  const [filterValue, setFilterValue] = useState(""); // Default filter value

  // Get unique filter values (mealType or cuisine) based on the selected filter type
  const filterOptions = Array.from(
    new Set(recipes.map((recipe) => recipe[filterType]))
  );

  // Update the filter value and notify the parent (Recipes.jsx) of the change
  useEffect(() => {
    onFilterChange(filterType, filterValue);
  }, [filterType, filterValue, onFilterChange]);

  return (
    <div>
      <div>
        {/* Dropdown to select filter type */}
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="mealType">Meal Type</option>
          <option value="cuisine">Cuisine</option>
        </select>

        {/* Dropdown to select filter value */}
        <select
          onChange={(e) => setFilterValue(e.target.value)}
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
