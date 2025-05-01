# 🍲 React Opgave – Smagfulde Favoritter

## 📌 Formål

Udvikle en webapp, hvor du viser flg.:

- Hente opskrifter fra en ekstern API.
- Like opskrifter, som evt. gemmes i `localStorage`.
- Se detaljer om hver opskrift på en separat detaljeside.

---

## 🛠️ Krav

- Projektet skal bygges i **React** med **JavaScript**.
- Brug **JSX** til alle komponenter.
- Anvend:
  - `useState`
  - `useEffect`
  - `props`
  - `fetch` med `async/await`
  - `try/catch`
  - `localStorage`

---

## 🔗 API

Hent opskrifter fra:

👉 `https://dummyjson.com/recipes`

---

## 🎯 Funktionalitet

1. **Hent opskrifter:**
   - Brug `fetch` til at hente opskrifter fra API’et.

2. **Vis opskrifter:**
   - Vis en liste med opskrifter.
   - Hver opskrift skal vise:
     - Titel
     - Billede
     - Like-knap ❤️

3. **Like-funktion:**
   - Når brugeren liker en opskrift:
     - Gem opskriftens `id` i `localStorage`.

4. **Detaljeside:**
   - Ved klik på en opskrift, vis:
     - Navn
     - Billede
     - Ingredienser
     - Instruktioner
   - Ved tid fetch resten af api'et (ratings, cookminutes, preptime osv.) 

5. **LocalStorage integration:**
   - Når brugeren liker/fjerner en opskrift:
     - Opdater både `state` og `localStorage`.

---

## 🧩 Foreslået komponentstruktur

```plaintext
App.jsx              // Hovedkomponent – routing og global state
Recipes.jsx          // Viser liste over alle opskrifter m. like-knap
RecipeDetail.jsx     // Detaljeret visning af én opskrift
```

---

## 🎁 Ekstra opgaver (valgfri)

- **Filtrér opskrifter** efter måltidstype (morgenmad, frokost, aftensmad).
- **Filtrér efter køkken** (f.eks. italiensk, asiatisk).
- **Tilføj søgefelt** til at finde opskrifter via navn.
- **Sortér opskrifter** efter rating, tilberedningstid eller popularitet.

---

## 🧠 Læringsmål

- Mestre komponentstruktur i React.
- Arbejde med eksterne API'er.
- Gemme og hente data fra `localStorage`.
- Forstå props-flow og state-håndtering i praksis.

---

## Aflevering

- Upload jeres projekt til jeres GitHub.
- Send underviseren et link til jeres projekt, på teams.
