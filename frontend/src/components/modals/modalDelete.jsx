import { useDispatch, useSelector } from "react-redux";
import { clientDelete, clientAllGet } from "../slice/ClientSlice";

import closeSVG from "../../assets/img/close.svg";

export const ModaleDelete = ({ onClose, idDelete }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(clientDelete({ id: idDelete }))
      .then(() => {
        dispatch(clientAllGet()); // Перезапрашиваем данные после удаления
        onClose(false); // Закрытие модала после удаления
      })
      .catch((error) => {
        console.error("Ошибка при удалении:", error);
      });
  };

  return (
    <div className="modal__deleteClient" onClick={() => onClose(false)}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__form">
          <h2 className="modal__subtitle text-center">Удалить данные</h2>
          <p className="modal__text">
            Вы действительно хотите удалить данного клиента?
          </p>
        </div>
        <div className="modal__close">
          <button
            className="btn-reset btn-closed"
            onClick={() => onClose(false)}
          >
            <img src={closeSVG} alt="close" />
          </button>
        </div>
        <button className="modal__content_btn-delete" onClick={handleDelete}>
          Удалить
        </button>
        <button
          className="btn-reset modal__content_close"
          onClick={() => onClose(false)}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
