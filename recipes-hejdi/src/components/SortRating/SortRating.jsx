import styles from "./SortRating.module.css";

export default function SortRating({ sortDirection, onSortChange }) {
  const handleClick = () => {
    if (sortDirection === "") {
      onSortChange("desc"); // Første klik sorterer høj til lav
    } else if (sortDirection === "desc") {
      onSortChange("asc"); // Andet klik sorterer lav til høj
    } else {
      onSortChange(""); // Tredje klik fjerner sortering
    }
  };

  //Hent det korrekte label baseret på nuværende sortering
  const getSortLabel = () => {
    if (sortDirection === "desc") {
      return "Rating: High to Low";
    } else if (sortDirection === "asc") {
      return "Rating: Low to High";
    } else {
      return "Sort by Rating";
    }
  };

  //Hent den korrekte ikon-class baseret på nuværende sortering
  const getSortIconClass = () => {
    if (sortDirection === "desc") {
      return "fas fa-sort-amount-down";
    } else if (sortDirection === "asc") {
      return "fas fa-sort-amount-up";
    } else {
      return "fas fa-sort";
    }
  };

  return (
    <button
      className={`${styles.sortButton} ${sortDirection ? styles.active : ""}`}
      onClick={handleClick}
    >
      <i className={getSortIconClass()}></i>
      {getSortLabel()}
    </button>
  );
}
