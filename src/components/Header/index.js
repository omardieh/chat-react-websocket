import { NavLink, useLocation } from "react-router-dom";
import classes from "./Header.module.css";

function Header({ navLinks, title }) {
  const location = useLocation();

  const handleActiveLink = (path) => {
    return location.pathname === path ? classes.active : classes.inactive;
  };

  return (
    <header className={classes.header}>
      <nav>
        {navLinks.map(({ title, path }, i) => (
          <NavLink to={path} key={i} className={handleActiveLink(path)}>
            {title}
          </NavLink>
        ))}
      </nav>
      <h2>{title}</h2>
    </header>
  );
}

export default Header;
