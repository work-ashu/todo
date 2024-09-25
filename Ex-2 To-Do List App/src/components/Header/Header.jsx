import "./Header.css";
import headerImage from "/todo-logo.png";
export default function Header() {
  return (
    <header>
      <img className="header__logo" src={headerImage} alt="todo image" />
      <h3 className="header__title">To-Do List </h3>
    </header>
  );
}
