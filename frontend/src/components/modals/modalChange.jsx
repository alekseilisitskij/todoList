import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { clientChange } from "../slice/ClientSlice";
import { ContactsInput } from "./contactsInput";
import { useDispatch, useSelector } from "react-redux";
import { BtnAddInput } from "./btnAddInput";

import closeSVG from "../../assets/img/close.svg";
import "./modal.css";

export const ModalChange = ({ selectedСlient, onClose }) => {
  const { name, surname, lastName, id, contacts, updatedAt, createdAt } =
    selectedСlient;
  // const selector = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [options, setOptions] = useState(contacts);
  const [countID, setCountID] = useState(1);

  const handelComponent = () => {
    // Действие для добавления option
    setOptions([...options, countID]);
    setCountID(countID + 1);
  };

  const handelDeleteComponent = (id) => {
    // Действие для удаления option
    console.log(id);
    setOptions(options.filter((item) => item !== id));
  };

  // useEffect(() => {
  //   dispatch(clientChange(id, selectedСlient));
  //   console.log(selector);
  // }, []);

  const handleSave = (handleSubmit, onClose) => {
    handleSubmit();
    onClose();
  };

  return (
    <div className="modal__changeClient">
      <Formik
        initialValues={{
          name: name,
          surname: surname,
          lastName: lastName,
          contacts: contacts,
          id: id,
          updatedAt: updatedAt,
          createdAt: new Date().toISOString(),
        }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, "Введи имя").required("Заполни"),
          surname: Yup.string().min(2, "Введи фамилию").required("Заполни"),
          lastName: Yup.string().min(2, "Введи отчество").required("Заполни"),
        })}
        // enableReinitialize={true} // это делается для того, чтобы обновлялся initialValues Fromik по состоянию contact и ещё есть способ ч/з setFieldValue
        // Если contact обновляется асинхронно – используй enableReinitialize={true}.
        // Если хочешь управлять значением вручную – используй setFieldValue("contacts", [...]).
        onSubmit={(values) => {
          console.log({ id, data: values });
          dispatch(clientChange({ id, data: values }));
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <div className="modal__content">
            <div className="modal__form">
              <Form className="form" id="newClientForm">
                <h2 className="modal__subtitle">
                  Изменить данные
                  <span className="modal__span"> ID: {id}</span>
                </h2>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user__surname"
                    name="surname"
                    value={values.surname}
                    required
                  />
                  <label htmlFor="" className="input-label">
                    Фамилия
                    <span className="input-title">*</span>
                  </label>
                  <ErrorMessage name="surname" component="div" />
                </div>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user_name"
                    name="name"
                    value={values.name}
                    required
                  />
                  <label htmlFor="" className="input-label">
                    Имя
                    <span className="input-title">*</span>
                  </label>
                  <ErrorMessage name="name" component="div" />
                </div>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user_lastname"
                    name="lastName"
                    value={values.lastName}
                    required
                  />
                  <label htmlFor="" className="input-label">
                    Отчество
                    <span className="input-title">*</span>
                  </label>
                  <ErrorMessage name="lastName" component="div" />
                </div>
              </Form>
            </div>
            <div className="modal__btn modal__btnChange">
              {options.map((item, i) => {
                return (
                  <ContactsInput
                    // Действие для добавления контактов в contacts
                    handelAddContacts={(data) => {
                      setFieldValue("contacts", [...values.contacts, data]); // Обновляем поле Formik
                    }}
                    contacts={item}
                    handelDeleteComponent={() => handelDeleteComponent(i)}
                    key={i}
                  />
                );
              })}
              {options.length > 0 ? (
                <BtnAddInput
                  handelComponent={handelComponent}
                  style={{ padding: "15px 0px" }}
                />
              ) : (
                <BtnAddInput
                  handelComponent={handelComponent}
                  style={{ padding: "0px 0px" }}
                />
              )}
            </div>
            <button
              className="modal__content_btn-create"
              id="changeBtn"
              type="submit"
              onClick={() => handleSave(handleSubmit, onClose)}
            >
              Сохранить
            </button>
            <button
              className="btn-reset modal__content_close"
              id="cancelBtn"
              onClick={onClose}
            >
              Отмена
            </button>
            <div className="modal__close">
              <button className="btn-reset btn-closed" onClick={onClose}>
                <img src={closeSVG} alt="close" />
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};
