import styles from "./SortRating.module.css";

/**
 * Komponent til sortering af opskrifter efter vurdering (rating)
 * @param {string} sortDirection - Nuværende sorteringsretning ("asc", "desc" eller "")
 * @param {function} onSortChange - Callback funktion til at ændre sorteringsretningen
 * @returns {JSX.Element} - Renderer en sorteringsknap med ikon
 */
export default function SortRating({ sortDirection, onSortChange }) {
  /**
   * Håndterer klik på sorteringsknappen
   * Skifter mellem tre tilstande: højest til lavest, lavest til højest, ingen sortering
   */
  const handleClick = () => {
    if (sortDirection === "") {
      onSortChange("desc"); // Første klik sorterer høj til lav
    } else if (sortDirection === "desc") {
      onSortChange("asc"); // Andet klik sorterer lav til høj
    } else {
      onSortChange(""); // Tredje klik fjerner sortering
    }
  };

  /**
   * Returnerer den korrekte tekst baseret på den nuværende sorteringstilstand
   * @returns {string} - Tekst der beskriver den aktuelle sortering
   */
  const getSortLabel = () => {
    if (sortDirection === "desc") {
      return "Rating: High to Low";
    } else if (sortDirection === "asc") {
      return "Rating: Low to High";
    } else {
      return "Sort by Rating";
    }
  };

  /**
   * Returnerer den korrekte ikon-klasse baseret på den nuværende sorteringstilstand
   * @returns {string} - CSS klasse for det passende ikon
   */
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
