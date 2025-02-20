import { TooltipContacts } from "./TooltipContacts"; //этот компонент помогает с tooltip
import { icons } from "./contactsElement";

export const Contacts = ({ contacts }) => {
  const contact = contacts.slice(0, 4).map(({ type, value }, i) => {
    // показ 4х начальных контактов
    return (
      <TooltipContacts key={i} contacts={contacts} type={type} value={value}>
        <a href={value} className={type}>
          <img src={icons[type]} alt={type} className={type} />
        </a>
      </TooltipContacts>
    );
  });
  return contact;
};
