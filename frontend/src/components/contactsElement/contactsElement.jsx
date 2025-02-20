import { useState, useEffect, useCallback } from "react";

import { PlusBtn } from "./PlusBtn";
import { Contacts } from "./contacts";
import { RefreshContacts } from "./refreshContacts";

import vkIcon from "../../assets/img/vk.svg";
import fbIcon from "../../assets/img/fb.svg";
import mailIcon from "../../assets/img/mail.svg";
import AdditionalPhoneIcon from "../../assets/img/AdditionalPhone.svg";
import phoneIcon from "../../assets/img/phone.svg";
import "./contacts.css";

export const icons = {
  vk: vkIcon,
  fb: fbIcon,
  mail: mailIcon,
  AdditionalPhone: AdditionalPhoneIcon,
  phone: phoneIcon,
};

// Компонент для создания контактов

export const CreateContactsElement = ({ contacts }) => {
  const [count, setCount] = useState(0); // счетчик для контактов
  const [isVisible, setIsVisible] = useState(true); // флаг для показа 4-х контактов или для всех

  const handelClick = useCallback(() => {
    setIsVisible(false);
  }, [isVisible]);

  useEffect(() => {
    setCount(contacts.length);
  }, [contacts]);

  return (
    <>
      {isVisible ? (
        <Contacts contacts={contacts} />
      ) : (
        <RefreshContacts contacts={contacts} /> // Это обновление для того, чтобы развернуть все контакты
      )}
      {count > 4 && isVisible ? ( // при клики на эту кнопку разварачивает все контакты и кнопка скрывается
        <PlusBtn count={count} handelClick={handelClick} /> // count передается, чтобы показать оставшию числиность контактов
      ) : null}
    </>
  );
};
