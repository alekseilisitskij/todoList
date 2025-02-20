import circle from "../../assets/img/add_circle_outline.svg";

// Кнопка добаления option
export const BtnAddInput = ({ handelComponent, style }) => {
  return (
    <button
      className="btn-reset modal__form_btn"
      id="addContactBtn"
      onClick={handelComponent}
      style={style}
    >
      <img src={circle} alt="circle" />
      Добавить контакт
    </button>
  );
};
