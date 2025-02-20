import { OverlayTrigger, Tooltip } from "react-bootstrap";

export const TooltipContacts = ({ type, value, children }) => {
  const typesTranslate = {
    vk: "Вконтакте",
    fb: "Facebook",
    mail: "Почта",
    phone: "Телефон",
    AdditionalPhone: "Доп.телефон",
  };
  // это библиотека прописывает что будет в tooltip
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {` ${typesTranslate[type]}: ${value}`}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="top" // Положение тултипа (может быть top, bottom, left, right)
      delay={{ show: 250, hide: 400 }} // Задержка показа и скрытия тултипа
      overlay={renderTooltip} // Функция, возвращающая тултип
    >
      <span>{children}</span>
    </OverlayTrigger>
  );
};
