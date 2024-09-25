import "./Button.css";
export default function Button({ buttonType, onSelect, children, cssClass }) {
  return (
    <button className={cssClass} onClick={onSelect}>
      {(buttonType === "editBtn" || buttonType === "deleteBtn") && (
        <i
          className={
            buttonType === "editBtn" ? "bi bi-pencil-square" : "bi bi-trash3"
          }
        ></i>
      )}
      {children}
    </button>
  );
}
