import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientAllGet } from "../slice/ClientSlice";
import { createPortal } from "react-dom";

import { dateInYyyyMmDdHhMmSs } from "../date/date";
import { tr } from "./btns";
import { CreateContactsElement } from "../contactsElement/contactsElement";
import { ModalChange } from "../modals/modalChange";

import "./table.css";
import pencil from "../../assets/img/pencil.svg";
import deleteSVG from "../../assets/img/delete.svg";

export const Table = () => {
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [selectedСlient, setselectedСlient] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(clientAllGet());
  }, [dispatch]);

  const handleEditClick = (client) => {
    setselectedСlient(client);
    setShowChangeModal(true);
  };

  const client = users.client.map(
    ({ name, surname, lastName, id, contacts, updatedAt, createdAt }) => {
      const updatetime = dateInYyyyMmDdHhMmSs(updatedAt);
      const createtime = dateInYyyyMmDdHhMmSs(createdAt);

      return (
        <tr key={id}>
          <td className="td__id">{id}</td>
          <td className="td__fio">{`${surname} ${name} ${lastName}`}</td>
          <td className="td__data">{updatetime}</td>
          <td className="td__clear">{createtime}</td>
          <td className="td__contacts">
            <span className="contacts">
              <CreateContactsElement contacts={contacts} />
            </span>
          </td>
          <td className="td__move">
            <button
              className="block__btn_change btn-reset"
              onClick={() =>
                handleEditClick({
                  name,
                  surname,
                  lastName,
                  id,
                  contacts,
                  updatedAt,
                  createdAt,
                })
              }
            >
              <img src={pencil} alt="arrow" />
              Изменить
            </button>
            <button className="block__btn_delete btn-reset">
              <img src={deleteSVG} alt="arrow" />
              Удалить
            </button>
          </td>
        </tr>
      );
    }
  );

  return (
    <>
      <div className="block">
        <h1 className="block__title">Клиенты</h1>
        <div className="block__list">
          <table className="table block__head">
            <thead>
              <tr>
                {tr}
                <th className="col block__contacts">Контакты</th>
                <th className="col block__move">Действия</th>
              </tr>
            </thead>
            <tbody>{client}</tbody>
          </table>
        </div>
      </div>
      {createPortal(
        showChangeModal && (
          <ModalChange
            selectedСlient={selectedСlient}
            onClose={() => setShowChangeModal()}
          />
        ),
        document.body
      )}
    </>
  );
};
