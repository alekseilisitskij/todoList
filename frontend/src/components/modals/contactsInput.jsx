import { useState } from "react";
import closeSmallSVG from "../../assets/img/cancelsmall.svg";

export const ContactsInput = ({
  handelDeleteComponent,
  handelAddContacts,
  contacts,
}) => {
  const initializationType = contacts ? contacts.type : "phone";
  const [type, setType] = useState(initializationType);

  const initializationValue = contacts ? contacts.value : "";
  const [value, setValue] = useState(initializationValue);

  const handleChangeType = (e) => {
    const newType = e.target.value;
    setType(newType);
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    const newContact = { type, value };
    handelAddContacts(newContact);
  };

  // setValue("");
  return (
    <div className="modal__input">
      <select
        className="form-select form-select-sm"
        aria-label=".form-select-sm"
        value={type}
        onChange={handleChangeType}
      >
        <option className="modal__input_option" value="phone">
          phone
        </option>
        <option className="modal__input_option" value="AdditionalPhone">
          AdditionalPhone
        </option>
        <option className="modal__input_option" value="mail">
          mail
        </option>
        <option className="modal__input_option" value="vk">
          vk
        </option>
        <option className="modal__input_option" value="fb">
          fb
        </option>
      </select>
      <input
        className="form-control modal__form-control"
        name="data_input"
        required={true}
        type="text"
        value={value}
        onChange={handleChangeValue}
        onBlur={handleBlur}
        placeholder="Введите данные контакта"
      />
      <button
        className="btn-reset form-delete_btn"
        onClick={handelDeleteComponent}
      >
        <img src={closeSmallSVG} alt="closeSmallSVG" />
      </button>
    </div>
  );
};
