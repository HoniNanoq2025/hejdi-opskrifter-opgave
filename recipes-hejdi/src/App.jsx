import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Recipes from "./components/Recipes/Recipes";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.link}>
            HOME
          </Link>
        </nav>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
