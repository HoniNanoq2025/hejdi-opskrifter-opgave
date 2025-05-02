import { useState } from "react";
import styles from "./Search.module.css";

export default function Search({ setSearchTerm }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  // Update search term after a short delay (debouncing)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Apply search term with slight delay to avoid excessive updates
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
