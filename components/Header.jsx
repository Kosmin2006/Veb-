import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">EcoNews Ukraine</h1>

      <nav>
        <Link to="/">Головна</Link>
        <Link to="/news">Новини</Link>
        <Link to="/about">Про сайт</Link>
        <Link to="/contact">Контакти</Link>
      </nav>
    </header>
  );
}
