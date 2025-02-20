import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { customAlphabet } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { clientCreate } from "../slice/ClientSlice";
import { ContactsInput } from "./contactsInput";
import { BtnAddInput } from "./btnAddInput";

import closeSVG from "../../assets/img/close.svg";
import "./modal.css";

// Устанавливаю индификатор через библиотеку nanoid
const nanoid = customAlphabet("0123456789", 13);

export const ModalAdd = ({ onClose }) => {
  const [options, setOptions] = useState([]); // Следит за состоянием option в selector
  const [countID, setCountID] = useState(1); // id для option

  const dispatch = useDispatch();

  const handelComponent = () => {
    // Действие для добавления option
    setOptions([...options, countID]);
    setCountID(countID + 1);
  };

  const handelDeleteComponent = (id) => {
    // Действие для удаления option
    setOptions(options.filter((item) => item !== id));
  };

  const handleSave = (handleSubmit, onClose) => {
    handleSubmit();
    onClose();
  };

  return (
    <div className="modal__newClient" id="newClientModal" onClick={onClose}>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          lastName: "",
          contacts: [],
          id: nanoid(),
          updatedAt: new Date().toISOString(),
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
        onSubmit={(values) => dispatch(clientCreate({ data: values }))}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__form">
              <Form className="form" id="newClientForm">
                <h2 className="modal__subtitle">Новый клиент</h2>
                <div className="text-field">
                  <Field
                    type="text"
                    className="form-control form_input"
                    id="user__surname"
                    name="surname"
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
            <div className="modal__btn">
              {options.map((item, i) => {
                return (
                  <ContactsInput
                    // Действие для добавления контактов в contacts
                    handelAddContacts={(data) => {
                      console.log(data);
                      setFieldValue("contacts", [...values.contacts, data]); // Обновляем поле Formik
                    }}
                    handelDeleteComponent={() => handelDeleteComponent(item)}
                    key={i}
                    // handelAddContacts={(data) => {
                    //   console.log(data);
                    //   const id = Date.now().toString();
                    //   const newContact = { ...data, id };
                    //   setFieldValue("contacts", [
                    //     ...values.contacts,
                    //     newContact,
                    //   ]); // Обновляем поле Formik
                    // }}
                    // handelDeleteComponent={handelDeleteComponent}
                    // key={i}
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
              id="saveBtn"
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
