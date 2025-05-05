import { useState } from "react";
import styles from "./Search.module.css";

/**
 * Søgekomponent der giver brugeren mulighed for at søge efter opskrifter
 * @param {function} setSearchTerm - Funktion til at opdatere søgeordet i parent komponenten
 * @returns {JSX.Element} - Renderer et søgefelt med formular
 */
export default function Search({ setSearchTerm }) {
  // State til at holde styr på input-værdi
  const [inputValue, setInputValue] = useState("");

  /**
   * Håndterer ændringer i input-feltet
   * @param {object} e - Event objekt fra input-feltet
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  /**
   * Håndterer formular-indsendelse (når brugeren trykker Enter)
   * @param {object} e - Event objekt fra formular-indsendelse
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  /**
   * Opdaterer søgeordet med en kort forsinkelse når brugeren skriver
   * Dette reducerer antallet af opdateringer (debouncing)
   * @param {object} e - Event objekt fra input-feltet
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Anvend søgeordet med en lille forsinkelse for at undgå for mange opdateringer
    setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search by recipe name"
        />
      </form>
    </div>
  );
}
