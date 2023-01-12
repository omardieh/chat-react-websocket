import "./App.css";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          {["Home", "Live Chat", "Login"].map((e, i) => (
            <NavLink
              key={i}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              {e}
            </NavLink>
          ))}
        </nav>
      </header>
      <aside></aside>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default App;
