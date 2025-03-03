import { useDispatch, useSelector } from "react-redux";
import { setSearchClient } from "../slice/ClientSlice";

import "./header.css";
import skbLogo from "../../assets/img/skb.svg";

export const Header = () => {
  const dispatch = useDispatch();

  const handleSearchClient = (e) => {
    dispatch(setSearchClient(e.target.value));
  };

  return (
    <div className="header">
      <a href="#" className="logo header__logo">
        <img src={skbLogo} alt="skb" />
      </a>
      <form className="form" id="filter__form">
        <input
          type="text"
          id="filter__inp"
          className="form__input"
          placeholder="Введите фамилию"
          onChange={handleSearchClient}
        />
      </form>
    </div>
  );
};
