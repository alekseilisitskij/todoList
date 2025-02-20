import { TooltipContacts } from "./TooltipContacts";
import { icons } from "./contactsElement";
// Показывает все контакты
export const RefreshContacts = ({ contacts }) => {
  const contact = contacts.map(({ type, value }, i) => {
    return (
      <TooltipContacts key={i} type={type} value={value}>
        <a href={value} className={type}>
          <img src={icons[type]} alt={type} className={type} />
        </a>
      </TooltipContacts>
    );
  });
  return contact;
};
